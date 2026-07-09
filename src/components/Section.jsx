import React from "react";
import { motion } from "framer-motion";
import Decode from "./fx/Decode";

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
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="font-mono text-[13px] text-acc tracking-[0.2em]">
          {index} / {kicker}
        </p>
        <h2
          className={`font-grotesk font-bold text-fg mt-2 ${
            size === "lg"
              ? "text-[clamp(30px,4.5vw,44px)] mb-10"
              : "text-[clamp(24px,3vw,32px)] mb-8"
          }`}
        >
          <Decode text={title} />
        </h2>
      </motion.div>
      {children}
    </section>
  );
};

export default Section;
