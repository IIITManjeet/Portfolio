import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Section from "./Section";
import { experiences } from "../constants";
import { EASE } from "./motion";

const ExperienceItem = ({ exp }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
    className="relative grid sm:grid-cols-[160px_1fr] gap-3 sm:gap-8 pb-12 last:pb-0"
  >
    {/* node on the timeline */}
    <motion.div
      aria-hidden="true"
      variants={{
        hidden: { scale: 0 },
        show: { scale: 1, transition: { type: "spring", stiffness: 500, damping: 18, delay: 0.1 } },
      }}
      className="hidden sm:block absolute left-[174px] top-[8px] w-[9px] h-[9px] rounded-full bg-acc shadow-[0_0_12px_rgb(var(--c-acc)/0.8)]"
    />

    <motion.p
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }}
      className="font-mono text-[12.5px] text-dim pt-[6px] sm:text-right sm:pr-8"
    >
      {exp.date}
    </motion.p>

    <motion.div
      variants={{
        hidden: { opacity: 0, x: 24 },
        show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE, delay: 0.05 } },
      }}
      className="sm:pl-8"
    >
      <h3 className="font-grotesk font-semibold text-[20px] text-fg">
        {exp.title}
      </h3>
      <p className="font-mono text-[13.5px] text-acc mt-1">
        @ {exp.company_name}
      </p>
      <ul className="mt-3 flex flex-col gap-2 list-none">
        {exp.points.map((point) => (
          <li
            key={point}
            className="font-inter text-[14.5px] leading-[24px] text-mut pl-5 relative before:content-['▸'] before:absolute before:left-0 before:text-acc/70"
          >
            {point}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 mt-4">
        {exp.tech.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const Experience = () => {
  const ref = useRef(null);
  // The spine fills as the list scrolls past the middle of the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 65%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <Section id="experience" index="02" kicker="experience" title="Where I've shipped.">
      <div ref={ref} className="relative flex flex-col">
        <div aria-hidden="true" className="hidden sm:block absolute left-[178px] top-[10px] bottom-0 w-px bg-line" />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: fill }}
          className="hidden sm:block absolute left-[178px] top-[10px] bottom-0 w-px bg-gradient-to-b from-acc via-acc to-cy origin-top"
        />
        {experiences.map((exp) => (
          <ExperienceItem key={exp.company_name + exp.date} exp={exp} />
        ))}
      </div>
    </Section>
  );
};

export default Experience;
