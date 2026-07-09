import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { experiences } from "../constants";

const ExperienceItem = ({ exp, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.05 }}
    transition={{ duration: 0.5, delay: i * 0.06 }}
    className="relative grid sm:grid-cols-[160px_1fr] gap-3 sm:gap-8 pb-10 last:pb-0"
  >
    {/* timeline spine */}
    <div className="hidden sm:block absolute left-[178px] top-[10px] bottom-0 w-px bg-line" />
    <div className="hidden sm:block absolute left-[174px] top-[8px] w-[9px] h-[9px] rounded-full bg-acc shadow-[0_0_12px_rgba(0,229,160,0.8)]" />

    <p className="font-mono text-[12.5px] text-dim pt-[6px] sm:text-right sm:pr-8">
      {exp.date}
    </p>

    <div className="sm:pl-8">
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
    </div>
  </motion.div>
);

const Experience = () => {
  return (
    <Section id="experience" index="02" kicker="experience" title="Where I've shipped.">
      <div className="flex flex-col">
        {experiences.map((exp, i) => (
          <ExperienceItem key={exp.company_name + exp.date} exp={exp} i={i} />
        ))}
      </div>
    </Section>
  );
};

export default Experience;
