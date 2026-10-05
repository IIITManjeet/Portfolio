// A small in-browser limit order book with price-time priority, used when the
// live Binance feed is unreachable. Orders arrive as a Poisson process around a
// random-walk fair value; limits that cross the book match FIFO per level.

const TICK = 0.5;
const MAX_TICKS_FROM_FAIR = 60;

const gaussian = () => {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

// Knuth's method — fine for the small rates used here
const poisson = (lambda) => {
  const l = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > l);
  return k - 1;
};

const roundTick = (p) => Math.round(p / TICK) * TICK;
const lotSize = () => Math.max(0.0001, +(Math.random() ** 3 * 0.8).toFixed(4));

export class SimBook {
  constructor(mid = 62000) {
    this.fair = roundTick(mid);
    this.bids = new Map(); // price -> [{ id, qty }] in arrival order
    this.asks = new Map();
    this.nextId = 1;
    this.trades = [];
    for (let i = 1; i <= 30; i++) {
      for (let k = 0; k < 2; k++) {
        this.rest("buy", this.fair - i * TICK, lotSize());
        this.rest("sell", this.fair + i * TICK, lotSize());
      }
    }
  }

  rest(side, price, qty) {
    const book = side === "buy" ? this.bids : this.asks;
    const p = roundTick(price);
    if (!book.has(p)) book.set(p, []);
    book.get(p).push({ id: this.nextId++, qty });
  }

  best(book, desc) {
    let best = null;
    for (const p of book.keys()) {
      if (best === null || (desc ? p > best : p < best)) best = p;
    }
    return best;
  }

  // Take liquidity from the opposite side, best price first, FIFO within a
  // level. Returns the quantity left unfilled.
  match(side, qty, limit) {
    const book = side === "buy" ? this.asks : this.bids;
    const desc = side === "sell";
    while (qty > 1e-9) {
      const p = this.best(book, desc);
      if (p === null) break;
      if (limit !== null && (side === "buy" ? p > limit : p < limit)) break;
      const queue = book.get(p);
      while (qty > 1e-9 && queue.length) {
        const head = queue[0];
        const fill = Math.min(head.qty, qty);
        head.qty -= fill;
        qty -= fill;
        this.trades.push({
          id: `s${this.nextId++}`,
          price: p,
          qty: fill,
          side,
          time: Date.now(),
        });
        if (head.qty <= 1e-9) queue.shift();
      }
      if (!queue.length) book.delete(p);
    }
    return qty;
  }

  cancelRandom() {
    const book = Math.random() < 0.5 ? this.bids : this.asks;
    const keys = [...book.keys()];
    if (!keys.length) return;
    const p = keys[Math.floor(Math.random() * keys.length)];
    const queue = book.get(p);
    queue.splice(Math.floor(Math.random() * queue.length), 1);
    if (!queue.length) book.delete(p);
  }

  prune() {
    const far = MAX_TICKS_FROM_FAIR * TICK;
    for (const book of [this.bids, this.asks]) {
      for (const p of book.keys()) if (Math.abs(p - this.fair) > far) book.delete(p);
    }
  }

  // Advance the simulation by dt seconds. Returns the number of order events.
  step(dt) {
    this.fair += gaussian() * 6 * Math.sqrt(dt);
    const events = poisson(60 * dt);
    for (let i = 0; i < events; i++) {
      const r = Math.random();
      const side = Math.random() < 0.5 ? "buy" : "sell";
      if (r < 0.55) {
        // passive limit, geometrically distributed distance from fair value
        const ticks = Math.floor(-Math.log(Math.random()) * 4);
        const price = roundTick(
          side === "buy" ? this.fair - ticks * TICK : this.fair + ticks * TICK
        );
        const left = this.match(side, lotSize(), price);
        if (left > 1e-9) this.rest(side, price, left);
      } else if (r < 0.85) {
        this.cancelRandom();
      } else {
        this.match(side, lotSize() * 0.6, null);
      }
    }
    this.prune();
    if (this.trades.length > 40) this.trades = this.trades.slice(-40);
    return events;
  }

  levels(depth) {
    const agg = (book) =>
      [...book.entries()].map(([p, q]) => [p, q.reduce((s, o) => s + o.qty, 0)]);
    return {
      bids: agg(this.bids).sort((a, b) => b[0] - a[0]).slice(0, depth),
      asks: agg(this.asks).sort((a, b) => a[0] - b[0]).slice(0, depth),
    };
  }

  drainTrades() {
    const t = this.trades;
    this.trades = [];
    return t;
  }
}
