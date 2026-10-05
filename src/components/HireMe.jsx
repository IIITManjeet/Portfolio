import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { services } from "../constants";
import { EASE, Item, Stagger, spotlight } from "./motion";

const accentText = {
  acc: "text-acc",
  cy: "text-cy",
};

const HireMe = () => {
  return (
    <Section id="services" index="06" kicker="services" title="What I can build for you.">
      <Stagger className="grid md:grid-cols-3 gap-6" stagger={0.1}>
        {services.map((s) => (
          <Item
            key={s.title}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE } }}
            onPointerMove={spotlight}
            className="spotlight lift bg-panel/80 border border-line rounded-xl p-6 flex flex-col gap-4"
          >
            <p className={`font-mono text-[12.5px] ${accentText[s.accent]}`}>
              {s.mono}
            </p>
            <h3 className="font-grotesk font-semibold text-[20px] text-fg">
              {s.title}
            </h3>
            <p className="font-inter text-[14.5px] leading-[24px] text-mut">
              {s.desc}
            </p>
            <a
              href={s.proofHref}
              className="font-mono text-[13px] text-mut hover:text-acc transition-colors mt-auto pt-2"
            >
              {s.proof} <span className="text-acc">→</span>
            </a>
          </Item>
        ))}
      </Stagger>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-mono text-[13px] text-dim mt-8 leading-[22px]"
      >
        <span className="text-acc">$</span> past freelance work — delivered{" "}
        <span className="text-fg">FW-Defence</span> end-to-end for a client
        (details available on request) · open to new engagements via the{" "}
        <a href="#contact" className="text-acc hover:underline">
          contact form
        </a>
      </motion.p>
    </Section>
  );
};

export default HireMe;
