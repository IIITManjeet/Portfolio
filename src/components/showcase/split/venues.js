// Four venue types, each reduced to one pure function: quote(amountIn) -> amountOut.
// Selling TUSD for TETH, priced near 1:1 so the four curves are comparable.
// Floats on purpose: this is a didactic model, not Braid's integer math.
// Parameters are illustrative, not chain state.

// Constant product, x * y = k, fee taken on input.
export function makeCpmm({ reserveIn, reserveOut, fee }) {
  return {
    quote(a) {
      if (!(a > 0)) return 0;
      const ain = a * (1 - fee);
      return (reserveOut * ain) / (reserveIn + ain);
    },
  };
}

// Curve StableSwap for two coins. D and y are solved by Newton's method.
export function makeStableSwap({ balanceIn, balanceOut, amp, fee }) {
  const ann = amp * 4; // A * n^n, n = 2
  const D = solveD(balanceIn, balanceOut, ann);

  const solveY = (x) => {
    // y^2 + (b - D) y = c, with b = x + D/Ann and c = D^3 / (4 x Ann)
    const c = (D * D * D) / (4 * x * ann);
    const b = x + D / ann;
    let y = D;
    for (let i = 0; i < 64; i++) {
      const prev = y;
      y = (y * y + c) / (2 * y + b - D);
      if (Math.abs(y - prev) <= 1e-9 * y) break;
    }
    return y;
  };

  return {
    quote(a) {
      if (!(a > 0)) return 0;
      const y = solveY(balanceIn + a * (1 - fee));
      return Math.max(0, Math.min(balanceOut, balanceOut - y));
    },
  };
}

function solveD(x, y, ann) {
  const S = x + y;
  let D = S;
  for (let i = 0; i < 64; i++) {
    const dp = (D * D * D) / (4 * x * y);
    const prev = D;
    D = ((ann * S + 2 * dp) * D) / ((ann - 1) * D + 3 * dp);
    if (Math.abs(D - prev) <= 1e-9 * D) break;
  }
  return D;
}

// Concentrated liquidity. Selling token0 pushes sqrtP down through ranges
// [lo, hi] (prices in out-per-in), each holding liquidity L. Below the
// lowest range there is nothing left: the venue consumes no more input.
export function makeClmm({ price, ranges, fee }) {
  const sorted = [...ranges].sort((p, q) => q.hi - p.hi);
  const quoteFull = (a) => {
    let rem = a * (1 - fee);
    let s = Math.sqrt(price);
    let out = 0;
    for (const r of sorted) {
      const top = Math.min(s, Math.sqrt(r.hi));
      const b = Math.sqrt(r.lo);
      if (top <= b) continue;
      const maxIn = r.L * (1 / b - 1 / top);
      if (rem < maxIn) {
        const s2 = 1 / (1 / top + rem / r.L);
        out += r.L * (top - s2);
        rem = 0;
        break;
      }
      out += r.L * (top - b);
      rem -= maxIn;
      s = b;
    }
    return { out, used: a - rem / (1 - fee) };
  };
  return {
    quote: (a) => (a > 0 ? quoteFull(a).out : 0),
    // input actually taken: nothing is consumed once price leaves the last range
    consumed: (a) => (a > 0 ? quoteFull(a).used : 0),
  };
}

// Central limit order book: resting asks at fixed rates, filled in whole lots.
// Input below one lot buys nothing, and input past the last level is unfilled.
export function makeClob({ lot, levels }) {
  return {
    lot,
    quote(a) {
      if (!(a > 0)) return 0;
      let lots = Math.floor(a / lot + 1e-9);
      let out = 0;
      for (const lv of levels) {
        if (lots <= 0) break;
        const take = Math.min(lots, lv.lots);
        out += take * lot * lv.rate;
        lots -= take;
      }
      return out;
    },
    // input actually taken: whole lots only, capped by resting size
    consumed(a) {
      if (!(a > 0)) return 0;
      const total = levels.reduce((n, lv) => n + lv.lots, 0);
      return Math.min(Math.floor(a / lot + 1e-9), total) * lot;
    },
  };
}

export const VENUES = [
  {
    id: "clob",
    label: "Order book",
    short: "CLOB",
    note: "whole lots of 2,500",
    ...makeClob({
      lot: 2500,
      levels: [
        { rate: 0.9997, lots: 40 },
        { rate: 0.9993, lots: 80 },
        { rate: 0.9985, lots: 120 },
        { rate: 0.997, lots: 200 },
        { rate: 0.994, lots: 300 },
      ],
    }),
  },
  {
    id: "stable",
    label: "StableSwap",
    short: "Stable",
    note: "A = 100",
    ...makeStableSwap({ balanceIn: 4e6, balanceOut: 4e6, amp: 100, fee: 0.0004 }),
  },
  {
    id: "clmm",
    label: "Concentrated",
    short: "CLMM",
    note: "two ranges",
    ...makeClmm({
      price: 1.0003,
      fee: 0.0005,
      ranges: [
        { lo: 0.997, hi: 1.0003, L: 2e8 },
        { lo: 0.985, hi: 0.997, L: 6e7 },
      ],
    }),
  },
  {
    id: "cpmm",
    label: "Constant product",
    short: "CPMM",
    note: "x · y = k",
    ...makeCpmm({ reserveIn: 2e7, reserveOut: 2e7, fee: 0.003 }),
  },
];

export const SIZE_MIN = 1e3;
export const SIZE_MAX = 1e7;
