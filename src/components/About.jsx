import React from "react";
import { motion } from "framer-motion";
import { EASE, Item, Stagger } from "./motion";
import Section from "./Section";
import { stack } from "../constants";

const About = () => {
  return (
    <Section id="about" index="01" kicker="about" title="Systems, markets, and the code between.">
      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12">
        <Stagger
          stagger={0.15}
          className="flex flex-col gap-5 font-inter text-[16px] leading-[28px] text-mut"
        >
          <Item as="p">
            At <span className="text-fg">Juspay</span> I build payment
            infrastructure that can't afford to blink — active-active
            multi-cell architecture targeting{" "}
            <span className="text-acc font-mono text-[15px]">99.995%</span>{" "}
            uptime in Haskell and Rust. Off the clock I chase latency: a{" "}
            <span className="text-fg">C++23 order book</span> clearing{" "}
            <span className="text-acc font-mono text-[15px]">22M ops/sec</span>{" "}
            and trend-following research at D+A Strategies.
          </Item>
          <Item as="p">
            The foundation: competitive programming —{" "}
            <span className="text-fg">ICPC Regionals finalist</span>, LeetCode{" "}
            <span className="text-fg">Guardian (top 1.13%)</span> — and a
            B.Tech as <span className="text-fg">Department Topper (9.66)</span>{" "}
            from IIIT Bhopal. I care about correctness, latency, and systems
            that fail gracefully.
          </Item>
        </Stagger>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: EASE, delay: 0.15, when: "beforeChildren", staggerChildren: 0.012 },
            },
          }}
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
                    <motion.span
                      key={item}
                      variants={{
                        hidden: { opacity: 0, scale: 0.85 },
                        show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE } },
                      }}
                      whileHover={{ y: -2 }}
                      className="chip hover:text-fg hover:border-cy/50 transition-colors"
                    >
                      {item}
                    </motion.span>
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
