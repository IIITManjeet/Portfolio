import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { stack } from "../constants";

const About = () => {
  return (
    <Section id="about" index="01" kicker="about" title="Systems, markets, and the code between.">
      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-5 font-inter text-[16px] leading-[28px] text-mut"
        >
          <p>
            At <span className="text-fg">Juspay</span> I build payment
            infrastructure that can't afford to blink — active-active
            multi-cell architecture targeting{" "}
            <span className="text-acc font-mono text-[15px]">99.995%</span>{" "}
            uptime in Haskell and Rust. Off the clock I chase latency: a{" "}
            <span className="text-fg">C++23 order book</span> clearing{" "}
            <span className="text-acc font-mono text-[15px]">22M ops/sec</span>{" "}
            and trend-following research at D+A Strategies.
          </p>
          <p>
            The foundation: competitive programming —{" "}
            <span className="text-fg">ICPC Regionals finalist</span>, LeetCode{" "}
            <span className="text-fg">Guardian (top 1.13%)</span> — and a
            B.Tech as <span className="text-fg">Department Topper (9.66)</span>{" "}
            from IIIT Bhopal. I care about correctness, latency, and systems
            that fail gracefully.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-panel/80 border border-line rounded-xl p-6 glow-cy h-fit"
        >
          <p className="font-mono text-[12px] text-dim mb-5">$ ls ~/stack</p>
          <div className="flex flex-col gap-5">
            {stack.map((s) => (
              <div key={s.group}>
                <p className="font-mono text-[12.5px] text-cy mb-2">
                  /{s.group}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
