import React, { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Shared motion vocabulary. Everything animates transform/opacity only;
// <MotionConfig reducedMotion="user"> in App drops the transforms for users
// who ask for less motion.
export const EASE = [0.16, 1, 0.3, 1]; // expo-out
export const DUR = 0.7;

const tag = (as) => motion[as] || motion.div;

const inView = (amount) => ({
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount, margin: "0px 0px -8% 0px" },
});

const rise = (y = 24) => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: DUR, ease: EASE } },
});

/** Fade-and-rise a single block when it scrolls into view (or on mount). */
export const Reveal = ({ as = "div", y = 24, delay = 0, amount = 0.15, onMount = false, children, ...rest }) => {
  const C = tag(as);
  const v = rise(y);
  return (
    <C
      {...(onMount ? { initial: "hidden", animate: "show" } : inView(amount))}
      variants={{ hidden: v.hidden, show: { ...v.show, transition: { ...v.show.transition, delay } } }}
      {...rest}
    >
      {children}
    </C>
  );
};

/** Parent that staggers its <Item> children. */
export const Stagger = ({ as = "div", stagger = 0.08, delay = 0, amount = 0.1, onMount = false, children, ...rest }) => {
  const C = tag(as);
  return (
    <C
      {...(onMount ? { initial: "hidden", animate: "show" } : inView(amount))}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </C>
  );
};

export const Item = ({ as = "div", y = 24, children, ...rest }) => {
  const C = tag(as);
  return (
    <C variants={rise(y)} {...rest}>
      {children}
    </C>
  );
};

/**
 * Masked word-by-word (or char-by-char) rise. Screen readers get the plain
 * string; the animated spans are aria-hidden.
 */
export const SplitText = ({
  text,
  as = "span",
  by = "word",
  delay = 0,
  stagger,
  onMount = false,
  amount = 0.5,
  className = "",
  wordClassName = "",
}) => {
  const C = tag(as);
  const step = stagger ?? (by === "char" ? 0.03 : 0.06);
  const piece = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
  };
  const words = text.split(" ");
  return (
    <C
      className={className}
      {...(onMount ? { initial: "hidden", animate: "show" } : inView(amount))}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <React.Fragment key={i}>
            <span className={`inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] ${wordClassName}`}>
              {by === "char" ? (
                [...w].map((ch, j) => (
                  <motion.span key={j} variants={piece} className="inline-block">
                    {ch}
                  </motion.span>
                ))
              ) : (
                <motion.span variants={piece} className="inline-block">
                  {w}
                </motion.span>
              )}
            </span>
            {i < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </span>
    </C>
  );
};

/** Pulls its child gently toward a mouse pointer. Inert on touch and with reduced motion. */
export const Magnetic = ({ strength = 0.3, className = "", children }) => {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });
  const ref = useRef(null);
  const move = (e) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
};

/** Pointer handler for `.spotlight` cards: feeds the cursor position to CSS. */
export const spotlight = (e) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
};
