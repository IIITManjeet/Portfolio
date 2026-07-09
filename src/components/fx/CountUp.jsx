import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Animates the leading number of a stat ("2170", "108th", "9.66").
 * Non-numeric or small stats ("R2", "2nd", "4kyu") render statically.
 */
const CountUp = ({ value, className = "" }) => {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(value);
  const num = match ? parseFloat(match[1]) : null;
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const suffix = match ? match[2] : "";
  const animatable = num !== null && num >= 10;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [current, setCurrent] = useState(animatable ? 0 : num);

  useEffect(() => {
    if (!inView || !animatable) return;
    const dur = 900;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(num * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, animatable, num]);

  if (!animatable) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }
  return (
    <span ref={ref} className={className}>
      {current.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default CountUp;
