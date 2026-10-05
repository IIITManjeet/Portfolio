// Marginal-price equalisation, the idea behind Braid's router:
// fill the order in chunks, each going to the venue paying the most per unit
// for that chunk, then rebalance by moving shrinking amounts between legs
// while that raises total output. Venues don't interact, so a route's output
// is exactly the sum of each venue's quote at its own allocation.

const stepFor = (v, size) => (v.lot ? v.lot : size / 1000);

// Output for one more step at allocation `a`, per unit of input.
export function marginalRate(v, a, size) {
  const h = stepFor(v, size);
  return (v.quote(a + h) - v.quote(a)) / h;
}

export function routeOrder(size, venues, { steps = 400, rebalance = true } = {}) {
  const n = venues.length;
  const alloc = new Array(n).fill(0);
  const out = (i, a = alloc[i]) => venues[i].quote(a);
  const chunk = size / steps;
  let rem = size;

  // greedy fill: best rate per unit consumed wins each chunk
  while (rem > size * 1e-9) {
    let best = -1;
    let bestRate = 0;
    let bestStep = 0;
    for (let i = 0; i < n; i++) {
      const v = venues[i];
      let s;
      if (v.lot) {
        s = Math.max(1, Math.round(chunk / v.lot)) * v.lot;
        if (s > rem + 1e-9) {
          s = Math.floor(rem / v.lot + 1e-9) * v.lot;
          if (s <= 0) continue;
        }
      } else {
        s = Math.min(chunk, rem);
      }
      const rate = (out(i, alloc[i] + s) - out(i)) / s;
      if (rate > bestRate + 1e-15) {
        best = i;
        bestRate = rate;
        bestStep = s;
      }
    }
    if (best < 0) break; // nothing left pays: the remainder stays unfilled
    alloc[best] += bestStep;
    rem -= bestStep;
  }

  // rebalance: move halving amounts between legs while total output rises
  if (rebalance && n > 1) {
    for (let d = chunk; d >= chunk / 64; d /= 2) {
      for (let pass = 0; pass < 24; pass++) {
        let moved = false;
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            if (i === j) continue;
            const lot = venues[i].lot || venues[j].lot;
            const delta = lot ? Math.max(1, Math.round(d / lot)) * lot : d;
            if (alloc[i] < delta - 1e-9) continue;
            const before = out(i) + out(j);
            const after = out(i, alloc[i] - delta) + out(j, alloc[j] + delta);
            if (after > before + 1e-9) {
              alloc[i] -= delta;
              alloc[j] += delta;
              moved = true;
            }
          }
        }
        if (!moved) break;
      }
    }
  }

  const legs = venues.map((v, i) => ({
    id: v.id,
    alloc: alloc[i],
    out: out(i),
    marginal: marginalRate(v, alloc[i], size),
  }));
  const totalOut = legs.reduce((s, l) => s + l.out, 0);
  return { size, legs, totalOut, unfilled: Math.max(0, rem), effective: totalOut / size };
}

// Effective price (output per unit input) across sizes, for each venue alone
// and for the routed order. Log-spaced samples between min and max.
export function priceCurves(venues, min, max, samples = 60) {
  const xs = Array.from({ length: samples }, (_, k) =>
    Math.pow(10, Math.log10(min) + ((Math.log10(max) - Math.log10(min)) * k) / (samples - 1))
  );
  // Single-venue lines plot output per unit *consumed* (so a book between
  // whole lots doesn't read as a price crash) and stop once the venue can
  // no longer absorb the order.
  const alone = venues.map((v) => {
    const points = [];
    for (const x of xs) {
      const used = v.consumed ? v.consumed(x) : x;
      if (used <= 0) continue;
      if (used < x - (v.lot || 1)) break; // exhausted
      points.push([x, v.quote(x) / used]);
    }
    return { id: v.id, points };
  });
  const routed = xs.map((x) => [x, routeOrder(x, venues, { steps: 160, rebalance: false }).effective]);
  return { xs, alone, routed };
}
