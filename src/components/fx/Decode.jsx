import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "!<>-_\\/[]{}—=+*^?#$01";

/** Scramble-decode text once it scrolls into view. */
const Decode = ({ text, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const total = 24; // frames of scramble
    const tick = () => {
      frame.current += 1;
      const progress = frame.current / total;
      const settled = Math.floor(text.length * progress);
      let out = text.slice(0, settled);
      for (let i = settled; i < text.length; i++) {
        out +=
          text[i] === " "
            ? " "
            : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(out);
      if (frame.current < total) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
};

export default Decode;
