import React from "react";
import { motion } from "framer-motion";
import { socials, ticker } from "../constants";
import Terminal from "./Terminal";
import { useLiveStats } from "../hooks/useLive";

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
    <div className="relative w-full border-y border-line bg-panel/60 overflow-hidden mt-16">
      <div className="ticker-track py-3">
        {[...items, ...items].map((t, i) => (
          <span
            key={`${t.label}-${i}`}
            className="font-mono text-[12.5px] whitespace-nowrap px-6 border-r border-line/60"
          >
            <span className="text-mut">{t.label}</span>{" "}
            <span className="text-fg">{t.value}</span>{" "}
            <span
              className={
                t.live
                  ? "text-acc cursor-blink"
                  : t.dir === "up"
                  ? "text-acc"
                  : "text-cy"
              }
            >
              {t.live ? "●" : t.dir === "up" ? "▲" : "◆"}
            </span>
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent pointer-events-none" />
    </div>
  );
};

const Hero = () => {
  return (
    <div id="top" className="relative pt-32 pb-4 overflow-hidden">
      <div className="absolute top-[-160px] right-[-160px] w-[500px] h-[500px] rounded-full bg-acc/[0.04] blur-[140px] pointer-events-none" />

      <div className="section-shell grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
        <div className="flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[14px] text-acc tracking-wide"
          >
            {"// backend · quant · web3 · competitive programming"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-grotesk font-bold text-[clamp(44px,7vw,76px)] leading-[1.05] text-fg"
          >
            Manjeet
            <br />
            Pathak<span className="text-acc">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-inter text-[17px] leading-[28px] text-mut max-w-[520px]"
          >
            I build{" "}
            <span className="text-fg">distributed payment infrastructure</span>{" "}
            at Juspay and{" "}
            <span className="text-fg">low-latency trading systems</span> on my
            own time — order books measured in nanoseconds, architectures
            measured in nines.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <a
              href="#projects"
              className="font-mono text-[14px] bg-acc text-ink font-semibold rounded px-6 py-3 hover:opacity-90 transition-opacity"
            >
              view projects →
            </a>
            <a
              href="#contact"
              className="font-mono text-[14px] text-fg border border-line rounded px-6 py-3 hover:border-acc/60 hover:text-acc transition-colors"
            >
              hire me
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[14px] text-mut border border-line rounded px-6 py-3 hover:border-acc/60 hover:text-acc transition-colors"
            >
              resume ↓
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex gap-2 -ml-3"
          >
            {[
              { label: "github", href: socials.github },
              { label: "linkedin", href: socials.linkedin },
              { label: "leetcode", href: socials.leetcode },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[13.5px] text-mut hover:text-acc transition-colors px-3 py-2"
              >
                {s.label} ↗
              </a>
            ))}
          </motion.div>
        </div>

        <Terminal />
      </div>

      <Ticker />
    </div>
  );
};

export default Hero;
