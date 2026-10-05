import React from "react";
import { motion } from "framer-motion";
import { EASE, SplitText } from "./motion";

const Section = ({
  id,
  index,
  title,
  kicker,
  children,
  size = "lg",
  className = "",
}) => {
  return (
    <section id={id} className={`section-shell py-10 sm:py-16 ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="flex items-center gap-3 font-mono text-[13px] tracking-[0.2em]"
      >
        <motion.span
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }}
          className="text-acc"
        >
          {index}
        </motion.span>
        <motion.span
          aria-hidden="true"
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1, transition: { duration: 0.8, ease: EASE, delay: 0.1 } },
          }}
          className="h-px w-10 bg-acc/60 origin-left"
        />
        <motion.span
          variants={{
            hidden: { opacity: 0, x: -8 },
            show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE, delay: 0.35 } },
          }}
          className="text-mut"
        >
          {kicker}
        </motion.span>
      </motion.div>
      <SplitText
        as="h2"
        text={title}
        delay={0.1}
        className={`block font-grotesk font-bold text-fg mt-3 ${
          size === "lg"
            ? "text-[clamp(30px,4.5vw,44px)] leading-[1.15] mb-10"
            : "text-[clamp(24px,3vw,32px)] leading-[1.2] mb-8"
        }`}
      />
      {children}
    </section>
  );
};

export default Section;
