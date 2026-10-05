import { useEffect, useRef, useState } from "react";
import { SimBook } from "./sim";

const WS_URL =
  "wss://stream.binance.com:9443/stream?streams=btcusdt@depth20@100ms/btcusdt@aggTrade";
const OPEN_TIMEOUT_MS = 4000;
const RETRY_MIN_MS = 5000;
const RETRY_MAX_MS = 60000;
const SIM_STEP_MS = 100;
const MAX_TRADES = 8;

const toLevels = (rows, depth) =>
  rows.slice(0, depth).map(([p, q]) => [parseFloat(p), parseFloat(q)]);

// Streams BTC/USDT depth + trades from Binance, falling back to a local
// simulated matching engine. Messages are written to a ref; React only sees a
// snapshot committed at most every `frameMs`, so a busy feed can't flood renders.
// Everything pauses while the tab is hidden or `targetRef` is off-screen.
export function useOrderBookFeed(targetRef, { depth = 10, frameMs = 100 } = {}) {
  const [snap, setSnap] = useState({
    bids: [],
    asks: [],
    trades: [],
    source: "connecting",
    rate: 0,
    ago: null,
  });
  const s = useRef(null);
  if (!s.current) {
    s.current = {
      bids: [],
      asks: [],
      trades: [],
      source: "connecting",
      lastMsg: 0,
      msgs: 0,
      rate: 0,
      rateT: 0,
      dirty: false,
      ws: null,
      sim: null,
      simTimer: null,
      openTimer: null,
      retryTimer: null,
      retryDelay: RETRY_MIN_MS,
      lastMid: null,
      active: false,
      raf: 0,
    };
  }

  useEffect(() => {
    const st = s.current;

    const pushTrades = (list) => {
      if (!list.length) return;
      st.trades = [...list.reverse(), ...st.trades].slice(0, MAX_TRADES);
    };

    const startSim = () => {
      if (st.sim) return;
      st.sim = new SimBook(st.lastMid ?? 62000);
      st.source = "sim";
      st.trades = [];
      st.dirty = true;
      st.simTimer = setInterval(() => {
        const events = st.sim.step(SIM_STEP_MS / 1000);
        const { bids, asks } = st.sim.levels(depth);
        st.bids = bids;
        st.asks = asks;
        pushTrades(st.sim.drainTrades());
        st.msgs += events;
        st.lastMsg = Date.now();
        st.dirty = true;
      }, SIM_STEP_MS);
    };

    const stopSim = () => {
      clearInterval(st.simTimer);
      st.simTimer = null;
      st.sim = null;
    };

    const scheduleRetry = () => {
      clearTimeout(st.retryTimer);
      st.retryTimer = setTimeout(connect, st.retryDelay);
      st.retryDelay = Math.min(st.retryDelay * 2, RETRY_MAX_MS);
    };

    const fail = () => {
      if (!st.active) return;
      startSim();
      scheduleRetry();
    };

    const onMessage = (ev) => {
      let msg;
      try {
        msg = JSON.parse(ev.data);
      } catch (e) {
        return;
      }
      const d = msg && msg.data;
      if (!d) return;
      if (st.source !== "live") {
        // first real message: the book on screen is now Binance's, not ours
        stopSim();
        st.source = "live";
        st.trades = [];
        st.retryDelay = RETRY_MIN_MS;
      }
      if (d.bids && d.asks) {
        st.bids = toLevels(d.bids, depth);
        st.asks = toLevels(d.asks, depth);
        if (st.bids.length && st.asks.length)
          st.lastMid = (st.bids[0][0] + st.asks[0][0]) / 2;
      } else if (d.e === "aggTrade") {
        pushTrades([
          {
            id: `b${d.a}`,
            price: parseFloat(d.p),
            qty: parseFloat(d.q),
            // m = buyer is the maker, so the aggressor sold
            side: d.m ? "sell" : "buy",
            time: d.T,
          },
        ]);
      }
      st.msgs++;
      st.lastMsg = Date.now();
      st.dirty = true;
    };

    function connect() {
      if (!st.active || st.ws) return;
      let ws;
      try {
        ws = new WebSocket(WS_URL);
      } catch (e) {
        fail();
        return;
      }
      st.ws = ws;
      st.openTimer = setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) ws.close();
      }, OPEN_TIMEOUT_MS);
      ws.onopen = () => clearTimeout(st.openTimer);
      ws.onmessage = onMessage;
      ws.onclose = () => {
        clearTimeout(st.openTimer);
        if (st.ws === ws) st.ws = null;
        fail();
      };
    }

    const commit = () => {
      const now = Date.now();
      if (now - st.rateT >= 1000) {
        st.rate = st.rateT ? (st.msgs * 1000) / (now - st.rateT) : 0;
        st.msgs = 0;
        st.rateT = now;
      }
      st.dirty = false;
      setSnap({
        bids: st.bids,
        asks: st.asks,
        trades: st.trades,
        source: st.source,
        rate: st.rate,
        ago: st.lastMsg ? now - st.lastMsg : null,
      });
    };

    let lastCommit = 0;
    const loop = (t) => {
      if (st.dirty && t - lastCommit >= frameMs) {
        lastCommit = t;
        commit();
      }
      st.raf = requestAnimationFrame(loop);
    };

    const resume = () => {
      if (st.active) return;
      st.active = true;
      st.rateT = 0;
      st.msgs = 0;
      // a visitor who was already on the simulator keeps seeing it while
      // live is retried, instead of a frozen book
      if (st.source === "sim") startSim();
      else {
        st.source = "connecting";
        st.dirty = true;
      }
      connect();
      st.raf = requestAnimationFrame(loop);
    };

    const pause = () => {
      if (!st.active) return;
      st.active = false;
      cancelAnimationFrame(st.raf);
      clearTimeout(st.openTimer);
      clearTimeout(st.retryTimer);
      stopSim();
      const ws = st.ws;
      st.ws = null;
      if (ws) {
        ws.onclose = null;
        ws.onmessage = null;
        ws.close();
      }
    };

    let visible = document.visibilityState !== "hidden";
    let onScreen = true;
    const sync = () => (visible && onScreen ? resume() : pause());

    const onVis = () => {
      visible = document.visibilityState !== "hidden";
      sync();
    };
    document.addEventListener("visibilitychange", onVis);

    let io;
    if (targetRef.current && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      });
      io.observe(targetRef.current);
    }
    sync();

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      io && io.disconnect();
      pause();
    };
  }, [targetRef, depth, frameMs]);

  return { snap, stateRef: s };
}
