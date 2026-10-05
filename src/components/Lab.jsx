import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import Section from "./Section";

const SplitExplorer = lazy(() => import("./showcase/SplitExplorer"));

const Lab = () => (
  <Section id="lab" index="04" kicker="lab" title="Split one order across four markets.">
    <p className="font-inter text-[16px] leading-[27px] text-mut max-w-[680px] -mt-4 mb-8">
      Drag the order size and watch a router divide it between a constant-product
      pool, a stable pool, a concentrated-liquidity range and an order book —
      filling wherever the next unit earns the most. It is the idea behind{" "}
      <Link to="/work/braid" className="text-acc hover:underline">Braid</Link>,
      rebuilt here as a small interactive.
    </p>
    <Suspense
      fallback={<div className="h-[640px] bg-panel/80 border border-line rounded-xl" aria-hidden="true" />}
    >
      <SplitExplorer />
    </Suspense>
  </Section>
);

export default Lab;
