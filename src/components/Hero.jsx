import React, { Suspense, lazy, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { socials, ticker } from "../constants";
import { useLiveStats } from "../hooks/useLive";
import { useUI } from "../context/ui";
import { GithubIcon, LinkedinIcon, CodeIcon } from "./fx/Icons";
import { EASE, Magnetic } from "./motion";

// deterministic pseudo-random sparkline per label — looks like a rating history chart
const sparkPoints = (label) => {
  let h = 0;
  for (const c of label) h = (h * 31 + c.charCodeAt(0)) % 9973;
  const ys = [];
  let v = 9;
  for (let i = 0; i < 9; i++) {
    h = (h * 137 + 71) % 9973;
    v = Math.max(3, Math.min(12, v + ((h % 7) - 3)));
    ys.push(v);
  }
  ys[8] = 2; // end on a high (y is inverted in SVG)
  return ys.map((y, i) => `${i * 6},${y}`).join(" ");
};

const Sparkline = ({ label, up }) => (
  <svg
    width="48"
    height="14"
    viewBox="0 0 48 14"
    className={`inline-block mx-2 ${up ? "text-acc" : "text-cy"}`}
    aria-hidden="true"
  >
    <polyline
      points={sparkPoints(label)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      opacity="0.9"
    />
    <circle cx="48" cy="2" r="2" fill="currentColor" />
  </svg>
);

const Ticker = () => {
  const live = useLiveStats();
  const items = ticker.map((t) => {
    if (t.label === "CODEFORCES" && live?.cf) {
      return {
        ...t,
        value: `${live.cf.maxRating} · ${live.cf.rank.toUpperCase()} · LIVE`,
        live: true,
      };
    }
    return t;
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="relative w-full border-y border-line bg-panel/60 overflow-hidden mt-16"
      aria-label="Ratings and highlights"
      role="region"
    >
      <div className="ticker-track py-3">
        {[...items, ...items].map((t, i) => (
          <span
            key={`${t.label}-${i}`}
            className="font-mono text-[12.5px] whitespace-nowrap px-6 border-r border-line/60 inline-flex items-center"
          >
            <span className="text-mut">{t.label}</span>
            <Sparkline label={t.label} up={t.dir === "up"} />
            <span className="text-fg">{t.value}</span>
            <span
              className={`ml-2 ${
                t.live
                  ? "text-acc cursor-blink"
                  : t.dir === "up"
                  ? "text-acc"
                  : "text-cy"
              }`}
            >
              {t.live ? "●" : t.dir === "up" ? "▲" : "◆"}
            </span>
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent pointer-events-none" aria-hidden="true" />
    </motion.div>
  );
};

const LiveOrderBook = lazy(() => import("./showcase/LiveOrderBook"));

const BookFallback = () => (
  <div className="w-full h-[452px] bg-panel border border-line rounded-xl" aria-hidden="true" />
);

// First-load choreography, in seconds from mount.
const T = { kicker: 0.05, name: 0.25, dot: 0.8, copy: 0.7, ctas: 0.85, socials: 1.1, book: 0.45 };

const KICKER = "// systems · trading · frontend";

const Kicker = () => (
  <motion.p
    initial="hidden"
    animate="show"
    variants={{ show: { transition: { staggerChildren: 0.018, delayChildren: T.kicker } } }}
    className="font-mono text-[14px] text-acc tracking-wide"
  >
    <span className="sr-only">{KICKER}</span>
    <span aria-hidden="true">
      {[...KICKER].map((ch, i) => (
        <motion.span key={i} variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0 } } }}>
          {ch}
        </motion.span>
      ))}
      <span className="cursor-blink ml-1">▌</span>
    </span>
  </motion.p>
);

const NameLine = ({ text, delay }) => (
  <motion.span
    className="block overflow-hidden pb-[0.06em] -mb-[0.06em]"
    initial="hidden"
    animate="show"
    variants={{ show: { transition: { staggerChildren: 0.035, delayChildren: delay } } }}
  >
    {[...text].map((ch, i) => (
      <motion.span
        key={i}
        className="inline-block"
        variants={{
          hidden: { y: "105%", rotate: 6 },
          show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE } },
        }}
      >
        {ch}
      </motion.span>
    ))}
  </motion.span>
);

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: EASE },
});

const Backdrop = () => {
  const reduce = useReducedMotion();
  const drift = (path) => (reduce ? undefined : path);
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute inset-0 hero-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
      <motion.div
        className="absolute top-[-220px] right-[-140px] w-[560px] h-[560px] rounded-full bg-acc/[0.07] blur-[140px] will-change-transform"
        animate={drift({ x: [0, -70, 30, 0], y: [0, 50, -30, 0] })}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[200px] left-[-220px] w-[480px] h-[480px] rounded-full bg-cy/[0.05] blur-[140px] will-change-transform"
        animate={drift({ x: [0, 60, -20, 0], y: [0, -40, 30, 0] })}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

const btn = "group font-mono text-[14px] rounded px-6 py-3 transition-colors inline-flex items-center gap-2";

const Hero = () => {
  const { go, setPaletteOpen, setTerminalOpen } = useUI();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 0.35]);
  const bookY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);

  const jump = (id) => (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    go(`#${id}`);
  };

  const ctas = [
    { label: "view work", href: "/#projects", onClick: jump("projects"), cls: "bg-acc text-ink font-semibold hover:bg-acc/90", arrow: "→" },
    { label: "contact", href: "/#contact", onClick: jump("contact"), cls: "text-fg border border-line hover:border-acc/60 hover:text-acc" },
    { label: "resume", href: "/resume.pdf", external: true, cls: "text-mut border border-line hover:border-acc/60 hover:text-acc", arrow: "↓" },
  ];

  return (
    <div id="top" ref={ref} className="relative pt-28 sm:pt-32 pb-4 overflow-hidden">
      <Backdrop />

      <div className="relative section-shell grid lg:grid-cols-[1fr_minmax(0,520px)] gap-12 lg:gap-14 items-center">
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="flex flex-col gap-6">
          <Kicker />
          <h1 className="font-grotesk font-bold text-[clamp(44px,7vw,76px)] leading-[1.05] text-fg">
            <span className="sr-only">Manjeet Pathak</span>
            <span aria-hidden="true">
              <NameLine text="Manjeet" delay={T.name} />
              <span className="flex items-end">
                <NameLine text="Pathak" delay={T.name + 0.12} />
                <motion.span
                  className="text-acc inline-block"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: T.dot, type: "spring", stiffness: 500, damping: 14 }}
                >
                  .
                </motion.span>
              </span>
            </span>
          </h1>
          <motion.p {...fadeUp(T.copy)} className="font-inter text-[17px] leading-[28px] text-mut max-w-[540px]">
            I build <span className="text-fg">payment infrastructure</span> at
            Juspay — multi-region, active-active, designed for 99.995% uptime —
            and the <span className="text-fg">interfaces that make complex
            systems legible</span>: trading terminals, protocol dashboards and
            interactive explainers.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: T.ctas } } }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2"
          >
            {ctas.map((b) => (
              <motion.div
                key={b.label}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
              >
                <Magnetic strength={0.25}>
                  <a
                    href={b.href}
                    onClick={b.onClick}
                    {...(b.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className={`${btn} ${b.cls}`}
                  >
                    {b.label}
                    {b.arrow && (
                      <span
                        aria-hidden="true"
                        className={`transition-transform duration-300 ${
                          b.arrow === "→" ? "group-hover:translate-x-1" : "group-hover:translate-y-0.5"
                        }`}
                      >
                        {b.arrow}
                      </span>
                    )}
                  </a>
                </Magnetic>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: T.socials, duration: 0.8 }}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 -ml-3"
          >
            {[
              { label: "github", href: socials.github, Icon: GithubIcon },
              { label: "linkedin", href: socials.linkedin, Icon: LinkedinIcon },
              { label: "leetcode", href: socials.leetcode, Icon: CodeIcon },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[13.5px] text-mut hover:text-acc transition-colors px-3 py-2 inline-flex items-center gap-2"
              >
                <s.Icon size={15} />
                {s.label}
              </a>
            ))}
            <span className="hidden sm:block basis-full pl-3 font-mono text-[12.5px] text-dim">
              <button type="button" onClick={() => setPaletteOpen(true)} className="kbd-btn">
                ctrl k
              </button>{" "}
              to navigate ·{" "}
              <button type="button" onClick={() => setTerminalOpen(true)} className="kbd-btn">
                `
              </button>{" "}
              for a terminal
            </span>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: bookY }} className="min-w-0">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, clipPath: "inset(0% 0% 100% 0% round 12px)" }}
            animate={
              reduce
                ? { opacity: 1 }
                : { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 12px)", transitionEnd: { clipPath: "none" } }
            }
            transition={{ delay: T.book, duration: 1.1, ease: EASE }}
          >
            <Suspense fallback={<BookFallback />}>
              <LiveOrderBook />
            </Suspense>
          </motion.div>
          <motion.p {...fadeUp(T.book + 0.8)} className="font-mono text-[11.5px] leading-[18px] text-dim mt-3">
            A React component, not a screenshot: WebSocket feed batched to
            ≤10 renders/sec, with an in-browser matching engine as fallback.
          </motion.p>
        </motion.div>
      </div>

      <Ticker />
    </div>
  );
};

export default Hero;
