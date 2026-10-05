import React, { useEffect, useRef } from "react";

const priceFmt = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const sizeFmt = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});
export const fmtPrice = (p) => priceFmt.format(p);
export const fmtSize = (q) => sizeFmt.format(q);

const withCumulative = (levels) => {
  let cum = 0;
  return levels.map(([price, size]) => {
    cum += size;
    return { price, size, cum };
  });
};

// Bars show each level's own size on a square-root scale: on a liquid book one
// level at the touch often dwarfs the rest, and a linear or cumulative scale
// would draw every row as a solid block.
const Row = ({ side, lvl, maxSize, flash }) => {
  const bar = side === "ask" ? "bg-down/[0.14]" : "bg-acc/[0.14]";
  const text = side === "ask" ? "text-down" : "text-acc";
  return (
    <div
      role="row"
      className={`relative grid grid-cols-3 px-3 h-[17px] items-center transition-colors duration-500 ${
        flash ? "bg-fg/[0.07]" : "bg-transparent"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 right-0 ${bar}`}
        style={{ width: `${maxSize ? Math.sqrt(lvl.size / maxSize) * 100 : 0}%` }}
      />
      <span role="cell" className={`relative ${text}`}>
        {fmtPrice(lvl.price)}
      </span>
      <span role="cell" className="relative text-right text-fg">
        {fmtSize(lvl.size)}
      </span>
      <span role="cell" className="relative text-right text-mut">
        {fmtSize(lvl.cum)}
      </span>
    </div>
  );
};

const Placeholder = ({ n }) =>
  Array.from({ length: n }, (_, i) => (
    <div key={i} role="row" className="grid grid-cols-3 px-3 h-[17px] items-center text-dim">
      <span role="cell">—</span>
      <span role="cell" className="text-right">—</span>
      <span role="cell" className="text-right">—</span>
    </div>
  ));

export const Ladder = ({ bids, asks, depth, reducedMotion }) => {
  const b = withCumulative(bids);
  const a = withCumulative(asks);
  const maxSize = Math.max(0, ...b.map((l) => l.size), ...a.map((l) => l.size));

  // size-change flash: compare against the sizes we drew last frame
  const prev = useRef(new Map());
  const changed = (key, size) =>
    !reducedMotion && prev.current.has(key) && prev.current.get(key) !== size;
  useEffect(() => {
    const m = new Map();
    b.forEach((l) => m.set(`b${l.price}`, l.size));
    a.forEach((l) => m.set(`a${l.price}`, l.size));
    prev.current = m;
  });

  const bestBid = b[0]?.price;
  const bestAsk = a[0]?.price;
  const hasTop = bestBid !== undefined && bestAsk !== undefined;
  const spread = hasTop ? bestAsk - bestBid : null;
  const mid = hasTop ? (bestAsk + bestBid) / 2 : null;

  return (
    <div role="table" aria-label="Order book ladder" className="font-mono text-[11.5px] tabular-nums">
      <div role="rowgroup">
        <div role="row" className="grid grid-cols-3 px-3 h-[20px] items-center text-dim text-[10.5px] uppercase tracking-wider">
          <span role="columnheader">price</span>
          <span role="columnheader" className="text-right">size</span>
          <span role="columnheader" className="text-right">total</span>
        </div>
      </div>
      <div role="rowgroup" aria-label="Asks">
        {a.length
          ? [...a]
              .reverse()
              .map((l) => (
                <Row key={`a${l.price}`} side="ask" lvl={l} maxSize={maxSize} flash={changed(`a${l.price}`, l.size)} />
              ))
          : <Placeholder n={depth} />}
        {a.length > 0 && a.length < depth && <Placeholder n={depth - a.length} />}
      </div>
      <div
        role="row"
        className="grid grid-cols-3 px-3 h-[22px] items-center border-y border-line/70 bg-raise/60 text-[11px]"
      >
        <span role="cell" className="text-fg font-semibold">
          {mid !== null ? fmtPrice(mid) : "—"}
        </span>
        <span role="cell" className="col-span-2 text-right text-dim">
          spread {spread !== null ? `${fmtPrice(spread)} · ${((spread / mid) * 1e4).toFixed(2)} bps` : "—"}
        </span>
      </div>
      <div role="rowgroup" aria-label="Bids">
        {b.length
          ? b.map((l) => (
              <Row key={`b${l.price}`} side="bid" lvl={l} maxSize={maxSize} flash={changed(`b${l.price}`, l.size)} />
            ))
          : <Placeholder n={depth} />}
        {b.length > 0 && b.length < depth && <Placeholder n={depth - b.length} />}
      </div>
    </div>
  );
};

// Mid price over the last minute. The y-axis hugs the observed range, which
// is labelled, so a few dollars of movement on BTC is visible but not overstated.
export const MidChart = ({ mids }) => {
  const W = 300;
  const H = 56;
  const N = 120;
  if (mids.length < 2) {
    return (
      <div className="h-[56px] flex items-center font-mono text-[10.5px] text-dim">
        mid price · collecting…
      </div>
    );
  }
  const lo = Math.min(...mids);
  const hi = Math.max(...mids);
  const span = hi - lo || 1;
  const x = (i) => ((N - mids.length + i) / (N - 1)) * W;
  const y = (v) => H - 6 - ((v - lo) / span) * (H - 14);
  const d = mids.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join("");
  const up = mids[mids.length - 1] >= mids[0];
  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 flex justify-between font-mono text-[9.5px] text-dim uppercase tracking-wider pointer-events-none">
        <span>mid · last 60s</span>
        <span className="tabular-nums normal-case">
          range {fmtPrice(hi - lo)}
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-[56px] block" aria-hidden="true">
        <path
          d={`${d} L${x(mids.length - 1).toFixed(1)},${H} L${x(0).toFixed(1)},${H} Z`}
          className={up ? "text-acc" : "text-down"}
          fill="currentColor"
          fillOpacity="0.1"
        />
        <path
          d={d}
          className={up ? "text-acc" : "text-down"}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

const timeFmt = (t) =>
  new Date(t).toLocaleTimeString("en-GB", { hour12: false });

export const Tape = ({ trades }) => (
  <div className="font-mono text-[11px] tabular-nums">
    <p className="px-3 h-[20px] flex items-center text-dim text-[10.5px] uppercase tracking-wider">
      trades
    </p>
    <ul aria-label="Recent trades" className="list-none">
      {trades.length === 0 && <li className="px-3 h-[17px] text-dim">waiting…</li>}
      {trades.map((t) => (
        <li key={t.id} className="px-3 h-[17px] flex items-center justify-between gap-2">
          <span className={t.side === "buy" ? "text-acc" : "text-down"}>
            {fmtPrice(t.price)}
          </span>
          <span className="text-fg">{t.qty.toFixed(4)}</span>
          <span className="text-dim">{timeFmt(t.time)}</span>
        </li>
      ))}
    </ul>
  </div>
);
