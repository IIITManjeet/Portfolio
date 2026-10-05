import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { VENUES, SIZE_MIN, SIZE_MAX } from "./split/venues";
import { routeOrder, priceCurves } from "./split/router";

// Literal class names so Tailwind's JIT keeps them.
const COLOR = {
  clob: { text: "text-down", bg: "bg-down" },
  stable: { text: "text-gold", bg: "bg-gold" },
  clmm: { text: "text-acc", bg: "bg-acc" },
  cpmm: { text: "text-cy", bg: "bg-cy" },
};

const SLIDER_MAX = 1000;
const L_MIN = Math.log10(SIZE_MIN);
const L_SPAN = Math.log10(SIZE_MAX) - L_MIN;

// slider position -> order size, rounded to 3 significant figures
const sizeAt = (pos) => {
  const raw = Math.pow(10, L_MIN + (L_SPAN * pos) / SLIDER_MAX);
  const mag = Math.pow(10, Math.floor(Math.log10(raw)) - 2);
  return Math.round(raw / mag) * mag;
};
const posOf = (size) => Math.round(((Math.log10(size) - L_MIN) / L_SPAN) * SLIDER_MAX);

const fmtAmt = (n) => {
  if (n >= 1e6) return `${+(n / 1e6).toFixed(n >= 1e7 ? 1 : 2)}M`;
  if (n >= 1e3) return `${+(n / 1e3).toFixed(n >= 1e5 ? 0 : 1)}k`;
  return n.toFixed(0);
};
const fmtFull = (n) => Math.round(n).toLocaleString("en-US");
const fmtRate = (r) => r.toFixed(4);

/* ------------------------------------------------------------------ */

const AllocationBar = ({ route, active, reduce }) => (
  <div>
    <div
      className="flex h-9 w-full overflow-hidden rounded-md border border-line bg-raise"
      aria-hidden="true"
    >
      {active.map((v) => {
        const leg = route.legs.find((l) => l.id === v.id);
        const pct = (100 * leg.alloc) / route.size;
        return (
          <motion.div
            key={v.id}
            className={`${COLOR[v.id].bg} relative h-full shrink-0`}
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 30 }}
          >
            {pct >= 9 && (
              <span className="absolute inset-0 flex items-center justify-center overflow-hidden whitespace-nowrap px-1 font-mono text-[11px] font-semibold text-ink">
                {v.short} {pct.toFixed(0)}%
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[12px]">
      {active.map((v) => {
        const leg = route.legs.find((l) => l.id === v.id);
        const pct = (100 * leg.alloc) / route.size;
        return (
          <li key={v.id} className="inline-flex items-center gap-2 text-mut">
            <span className={`inline-block h-2.5 w-2.5 rounded-sm ${COLOR[v.id].bg}`} />
            {v.label}
            <span className={pct > 0 ? "text-fg" : "text-dim"}>{pct.toFixed(1)}%</span>
          </li>
        );
      })}
    </ul>
  </div>
);

/* ------------------------------------------------------------------ */

const LegTable = ({ route, active }) => {
  const usedRates = route.legs.filter((l) => l.alloc > 0 && l.marginal > 0).map((l) => l.marginal);
  const floor = usedRates.length ? Math.min(...usedRates) : 0;
  return (
    <div className="overflow-x-auto rounded-lg border border-line" tabIndex={0} role="region" aria-label="Route legs table">
      <table className="w-full min-w-[520px] border-collapse font-mono text-[12.5px]">
        <caption className="sr-only">
          Route legs for an order of {fmtFull(route.size)} TUSD: allocation, output and marginal rate per venue
        </caption>
        <thead>
          <tr className="bg-raise text-left text-dim">
            <th scope="col" className="px-4 py-2.5 font-normal">venue</th>
            <th scope="col" className="px-4 py-2.5 text-right font-normal">allocated (TUSD)</th>
            <th scope="col" className="px-4 py-2.5 text-right font-normal">out (TETH)</th>
            <th scope="col" className="px-4 py-2.5 text-right font-normal">marginal rate</th>
          </tr>
        </thead>
        <tbody>
          {active.map((v) => {
            const leg = route.legs.find((l) => l.id === v.id);
            const idle = leg.alloc <= 0;
            const exhausted = leg.marginal <= 1e-9;
            // an idle venue paying more than a used leg would mean a wrong split
            const beatsUsed = idle && !exhausted && leg.marginal > floor + 1e-6;
            return (
              <tr key={v.id} className="border-t border-line/70">
                <th scope="row" className="px-4 py-2.5 text-left font-normal">
                  <span className="inline-flex items-center gap-2 text-fg">
                    <span className={`inline-block h-2 w-2 rounded-full ${COLOR[v.id].bg}`} />
                    {v.label}
                  </span>
                  <span className="ml-2 text-dim">{v.note}</span>
                </th>
                <td className={`px-4 py-2.5 text-right ${idle ? "text-dim" : "text-fg"}`}>
                  {idle ? "—" : fmtFull(leg.alloc)}
                </td>
                <td className={`px-4 py-2.5 text-right ${idle ? "text-dim" : "text-fg"}`}>
                  {idle ? "—" : fmtFull(leg.out)}
                </td>
                <td className="px-4 py-2.5 text-right">
                  {exhausted ? (
                    <span className="text-dim">no depth left</span>
                  ) : (
                    <span className={idle ? (beatsUsed ? "text-down" : "text-dim") : COLOR[v.id].text}>
                      {fmtRate(leg.marginal)}
                      {idle && <span className="ml-1 text-dim">idle</span>}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t border-line bg-raise/60">
            <th scope="row" className="px-4 py-2.5 text-left font-normal text-mut">routed total</th>
            <td className="px-4 py-2.5 text-right text-fg">{fmtFull(route.size - route.unfilled)}</td>
            <td className="px-4 py-2.5 text-right font-semibold text-fg">{fmtFull(route.totalOut)}</td>
            <td className="px-4 py-2.5 text-right text-mut">avg {fmtRate(route.effective)}</td>
          </tr>
        </tfoot>
      </table>
      {route.unfilled > 0 && (
        <p className="border-t border-line/70 px-4 py-2.5 font-mono text-[12px] text-down">
          {fmtFull(route.unfilled)} TUSD unfilled: the enabled venues have no depth left
        </p>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */

const W = 640;
const H = 280;
const PAD = { l: 52, r: 92, t: 16, b: 34 };

const PriceChart = ({ curves, active, size, route }) => {
  const xOf = (x) => PAD.l + ((Math.log10(x) - L_MIN) / L_SPAN) * (W - PAD.l - PAD.r);

  // y domain hugs the routed line; single-venue lines that fall below are clipped
  const [yLo, yHi] = useMemo(() => {
    const ys = curves.routed.map((p) => p[1]).concat(
      curves.alone.flatMap((c) => c.points.map((p) => p[1]).filter((y) => y > 0.99))
    );
    const lo = Math.min(...curves.routed.map((p) => p[1]));
    const hi = Math.max(...ys);
    const span = Math.max(hi - lo, 0.002);
    return [lo - span * 0.12, hi + span * 0.08];
  }, [curves]);
  const yOf = (y) => PAD.t + (1 - (y - yLo) / (yHi - yLo)) * (H - PAD.t - PAD.b);
  const path = (pts) =>
    pts.map(([x, y], i) => `${i ? "L" : "M"}${xOf(x).toFixed(1)},${yOf(y).toFixed(1)}`).join("");

  const yTicks = useMemo(() => {
    const step = (yHi - yLo) / 4;
    return Array.from({ length: 5 }, (_, i) => yLo + step * i);
  }, [yLo, yHi]);
  const xTicks = [1e3, 1e4, 1e5, 1e6, 1e7].filter((x) => x >= SIZE_MIN && x <= SIZE_MAX);

  // Lines that reach the right edge are labelled there (nudged apart); lines
  // whose venue runs dry earlier get an end dot and a label at that point.
  const yMax = H - PAD.b - 2;
  const { edge, ends } = useMemo(() => {
    const edgeX = curves.xs[curves.xs.length - 1];
    const edge = [{ id: "routed", y: yOf(curves.routed[curves.routed.length - 1][1]), text: "routed" }];
    const ends = [];
    for (const c of curves.alone) {
      if (!c.points.length) continue;
      const [x, y] = c.points[c.points.length - 1];
      const short = VENUES.find((v) => v.id === c.id).short;
      if (x >= edgeX) edge.push({ id: c.id, y: Math.min(yOf(y), yMax), text: short });
      else ends.push({ id: c.id, x: xOf(x), y: Math.min(yOf(y), yMax), text: `${short} runs dry` });
    }
    // keep labels 13px apart: push down, then back up from the plot floor
    edge.sort((a, b) => a.y - b.y);
    for (let i = 1; i < edge.length; i++) edge[i].y = Math.max(edge[i].y, edge[i - 1].y + 13);
    if (edge.length) edge[edge.length - 1].y = Math.min(edge[edge.length - 1].y, yMax);
    for (let i = edge.length - 2; i >= 0; i--) edge[i].y = Math.min(edge[i].y, edge[i + 1].y - 13);
    // end-of-line labels sit below their dot (the lines run along the top),
    // stepping further down when two dots are close horizontally
    ends.sort((a, b) => a.x - b.x);
    ends.forEach((e, i) => {
      e.ly = e.y + 16;
      // alternate sides so neighbouring labels never collide
      e.anchor = i % 2 ? "start" : "end";
      e.lx = i % 2 ? e.x + 6 : e.x - 6;
    });
    return { edge, ends };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curves, yLo, yHi]);

  const best = Math.max(...active.map((v) => v.quote(size) / size));
  const summary = `Effective price against order size, from ${fmtAmt(SIZE_MIN)} to ${fmtAmt(
    SIZE_MAX
  )} TUSD on a log scale. At ${fmtFull(size)} TUSD the routed order earns ${fmtRate(
    route.effective
  )} TETH per TUSD, against ${fmtRate(best)} for the best single venue.`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[560px]" role="img" aria-label={summary}>
      <defs>
        <clipPath id="split-plot">
          <rect x={PAD.l} y={PAD.t} width={W - PAD.l - PAD.r} height={H - PAD.t - PAD.b} />
        </clipPath>
      </defs>

      <g className="text-line">
        {yTicks.map((y) => (
          <line key={y} x1={PAD.l} x2={W - PAD.r} y1={yOf(y)} y2={yOf(y)} stroke="currentColor" strokeWidth="1" />
        ))}
      </g>
      <g className="fill-dim font-mono" fontSize="10">
        {yTicks.map((y) => (
          <text key={y} x={PAD.l - 8} y={yOf(y) + 3} textAnchor="end">
            {y.toFixed(4)}
          </text>
        ))}
        {xTicks.map((x) => (
          <text key={x} x={xOf(x)} y={H - PAD.b + 18} textAnchor="middle">
            {fmtAmt(x)}
          </text>
        ))}
        <text x={(PAD.l + W - PAD.r) / 2} y={H - 2} textAnchor="middle">
          order size (TUSD, log)
        </text>
      </g>

      <g clipPath="url(#split-plot)" fill="none">
        {curves.alone.map((c) => (
          <path
            key={c.id}
            d={path(c.points)}
            className={COLOR[c.id].text}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.8"
          />
        ))}
        <path d={path(curves.routed)} className="text-fg" stroke="currentColor" strokeWidth="2.5" />
      </g>

      {/* current order size */}
      <g className="text-fg">
        <line
          x1={xOf(size)}
          x2={xOf(size)}
          y1={PAD.t}
          y2={H - PAD.b}
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeDasharray="2 3"
        />
        <circle
          cx={xOf(size)}
          cy={yOf(Math.max(route.effective, yLo))}
          r="4.5"
          fill="currentColor"
          className="text-acc"
        />
      </g>

      <g className="font-mono" fontSize="10.5">
        {edge.map((l) => (
          <text
            key={l.id}
            x={W - PAD.r + 8}
            y={Math.min(l.y, H - PAD.b) + 3}
            className={l.id === "routed" ? "fill-fg font-semibold" : `fill-current ${COLOR[l.id].text}`}
          >
            {l.text}
          </text>
        ))}
        {ends.map((l) => (
          <g key={l.id} className={COLOR[l.id].text}>
            <circle cx={l.x} cy={l.y} r="3" fill="currentColor" />
            <text x={l.lx} y={l.ly} textAnchor={l.anchor} className="fill-current">
              {l.text}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

/* ------------------------------------------------------------------ */

const SplitExplorer = () => {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState(posOf(1e6));
  const [enabled, setEnabled] = useState(() => new Set(VENUES.map((v) => v.id)));
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // coalesce slider events to one recompute per frame
  const onSlide = useCallback((e) => {
    const next = Number(e.target.value);
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => setPos(next));
  }, []);

  const toggle = (id) =>
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size === 1) return prev; // keep at least one venue
        next.delete(id);
      } else next.add(id);
      return next;
    });

  const enabledKey = [...enabled].sort().join(",");
  const active = useMemo(() => VENUES.filter((v) => enabled.has(v.id)), [enabledKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const size = sizeAt(pos);
  const route = useMemo(() => routeOrder(size, active), [size, active]);
  const curves = useMemo(() => priceCurves(active, SIZE_MIN, SIZE_MAX, 60), [active]);

  const bestSingle = Math.max(...active.map((v) => v.quote(size)));
  const gainBps = bestSingle > 0 ? (route.totalOut / bestSingle - 1) * 1e4 : 0;

  return (
    <div className="rounded-xl border border-line bg-panel/80 p-5 sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex-1 lg:max-w-[560px]">
          <label htmlFor="split-size" className="font-mono text-[12.5px] text-mut">
            order size · sell TUSD for TETH
          </label>
          <p className="mt-1 font-grotesk text-[30px] font-bold leading-tight text-fg tabular-nums">
            {fmtFull(size)} <span className="text-[16px] font-medium text-dim">TUSD</span>
          </p>
          <input
            id="split-size"
            type="range"
            min="0"
            max={SLIDER_MAX}
            step="1"
            defaultValue={pos}
            onInput={onSlide}
            aria-valuetext={`${fmtFull(size)} TUSD`}
            className="mt-3 h-11 w-full cursor-pointer accent-acc"
          />
          <div className="flex justify-between font-mono text-[11px] text-dim" aria-hidden="true">
            <span>{fmtAmt(SIZE_MIN)}</span>
            <span>{fmtAmt(SIZE_MAX)}</span>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-4 font-mono lg:min-w-[360px]">
          <div>
            <dt className="text-[11px] text-dim">routed out</dt>
            <dd className="mt-1 text-[15px] text-fg tabular-nums">{fmtAmt(route.totalOut)}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-dim">avg rate</dt>
            <dd className="mt-1 text-[15px] text-fg tabular-nums">{fmtRate(route.effective)}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-dim">vs best venue</dt>
            <dd className={`mt-1 text-[15px] tabular-nums ${gainBps > 0.05 ? "text-acc" : "text-mut"}`}>
              {gainBps > 0.05 ? `+${gainBps < 10 ? gainBps.toFixed(1) : Math.round(gainBps)} bps` : "same"}
            </dd>
          </div>
        </dl>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-2 font-mono text-[12px] text-dim">venues in the route</legend>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {VENUES.map((v) => {
            const on = enabled.has(v.id);
            return (
              <label
                key={v.id}
                className={`inline-flex min-h-[44px] cursor-pointer select-none items-center gap-2 rounded-md border px-3 font-mono text-[12.5px] transition-colors ${
                  on ? "border-line bg-raise text-fg" : "border-line/60 text-dim"
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(v.id)}
                  disabled={on && enabled.size === 1}
                  className="h-4 w-4 accent-acc"
                />
                <span className={`inline-block h-2 w-2 rounded-full ${COLOR[v.id].bg}`} aria-hidden="true" />
                {v.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6">
        <AllocationBar route={route} active={active} reduce={reduce} />
      </div>

      <div className="mt-6 grid gap-6 grid-cols-[minmax(0,1fr)]">
        <div>
          <p className="mb-2 font-mono text-[12px] text-dim">
            the leg table is the argument: used legs stop where their marginal rates meet
          </p>
          <LegTable route={route} active={active} />
        </div>
        <div>
          <p className="mb-2 font-mono text-[12px] text-dim">effective price (TETH per TUSD consumed) vs order size — dashed: one venue alone</p>
          <div className="rounded-lg border border-line bg-ink/40 p-2 overflow-x-auto" tabIndex={0} role="region" aria-label="Effective price chart">
            <PriceChart curves={curves} active={active} size={size} route={route} />
          </div>
        </div>
      </div>

      <p className="mt-6 border-t border-line/70 pt-4 font-inter text-[13.5px] leading-[22px] text-mut">
        A simplified in-browser model of Braid's router — illustrative pool parameters, not chain state. The real
        router is Rust, checked against Sui and Aptos Move VMs.{" "}
        <a
          href="https://github.com/IIITManjeet/Braid"
          target="_blank"
          rel="noreferrer"
          className="text-acc underline-offset-4 hover:underline"
        >
          Source on GitHub
        </a>{" "}
        ·{" "}
        <a
          href="https://braid-4piq.onrender.com"
          target="_blank"
          rel="noreferrer"
          className="text-acc underline-offset-4 hover:underline"
        >
          live app
        </a>
      </p>
    </div>
  );
};

export default SplitExplorer;
