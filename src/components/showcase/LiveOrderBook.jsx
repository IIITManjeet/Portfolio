import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useOrderBookFeed } from "./orderbook/useOrderBookFeed";
import { Ladder, MidChart, Tape, fmtPrice } from "./orderbook/parts";

const DEPTH = 8;

const BADGE = {
  live: { text: "● LIVE · BINANCE BTC/USDT", cls: "text-acc border-acc/40 bg-acc/10" },
  sim: { text: "◆ SIMULATED · local matching engine", cls: "text-cy border-cy/40 bg-cy/10" },
  connecting: { text: "○ CONNECTING · BINANCE", cls: "text-dim border-line" },
};

// BTC/USDT order book: Binance's public stream when reachable, otherwise a
// local price-time-priority matching engine. The badge always says which.
const LiveOrderBook = ({ className = "" }) => {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const { snap, stateRef } = useOrderBookFeed(rootRef, {
    depth: DEPTH,
    frameMs: reduced ? 500 : 100,
  });
  const badge = BADGE[snap.source];

  // mid-price history: one sample every 500 ms, last 60 s; reset when the
  // source switches so live and simulated prices are never drawn as one line
  const [mids, setMids] = useState([]);
  const lastSource = useRef(null);
  useEffect(() => {
    const id = setInterval(() => {
      const st = stateRef.current;
      if (!st.active || !st.bids.length || !st.asks.length) return;
      const mid = (st.bids[0][0] + st.asks[0][0]) / 2;
      setMids((m) => {
        const base = lastSource.current === st.source ? m : [];
        lastSource.current = st.source;
        return [...base, mid].slice(-120);
      });
    }, 500);
    return () => clearInterval(id);
  }, [stateRef]);

  // screen-reader summary, refreshed at most every 5 s rather than per tick
  const [summary, setSummary] = useState("");
  useEffect(() => {
    const id = setInterval(() => {
      const st = stateRef.current;
      if (!st.active || !st.bids.length || !st.asks.length) return;
      const label = st.source === "live" ? "live from Binance" : "simulated";
      setSummary(
        `BTC/USDT ${label}: best bid ${fmtPrice(st.bids[0][0])}, best ask ${fmtPrice(st.asks[0][0])}.`
      );
    }, 5000);
    return () => clearInterval(id);
  }, [stateRef]);

  return (
    <section
      ref={rootRef}
      aria-label="BTC/USDT order book"
      className={`w-full bg-panel/90 border border-line rounded-xl overflow-hidden glow-acc ${className}`}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-line bg-raise">
        <span className="font-mono text-[12px] text-dim truncate">
          orderbook · btc/usdt
        </span>
        <span
          className={`font-mono text-[10.5px] border rounded px-2 py-[2px] whitespace-nowrap ${badge.cls}`}
        >
          {badge.text}
        </span>
      </div>

      <div className="grid sm:grid-cols-[minmax(0,1fr)_196px] sm:divide-x divide-line/70 py-2">
        <Ladder bids={snap.bids} asks={snap.asks} depth={DEPTH} reducedMotion={reduced} />
        <div className="hidden sm:block">
          <Tape trades={snap.trades} />
        </div>
      </div>

      <div className="relative px-3 pb-2 border-t border-line/70 pt-2">
        <MidChart mids={mids} />
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-2 border-t border-line/70 bg-raise/60 font-mono text-[10.5px] text-dim tabular-nums">
        <span>
          {snap.source === "sim" ? "events/s" : "msg/s"} {snap.rate.toFixed(1)}
        </span>
        <span>
          {snap.ago === null ? "waiting for data" : `updated ${snap.ago} ms ago`}
        </span>
      </div>

      <p className="sr-only" aria-live="polite">
        {summary}
      </p>
    </section>
  );
};

export default LiveOrderBook;
