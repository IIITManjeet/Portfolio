import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { projects } from "../constants";
import { useLiveStats } from "../hooks/useLive";

const metricStyle = {
  perf: "text-acc border-acc/30 bg-acc/[0.06]",
  cap: "text-cy border-cy/30 bg-cy/[0.06]",
};

const ProjectCard = ({ p, i }) => (
  <motion.a
    href={p.link}
    target="_blank"
    rel="noreferrer"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.05 }}
    transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
    className="lift sheen block bg-panel/80 border border-line rounded-xl p-6 no-underline group"
  >
    <div className="flex items-center justify-between gap-3">
      <p className="font-mono text-[13px] text-dim truncate">
        <span className="text-mut">●</span> ~/
        <span className="text-mut">{p.name}</span>
      </p>
      <span className="font-mono text-[12px] text-dim group-hover:text-acc transition-colors shrink-0 py-2 -my-2 pl-2">
        source ↗
      </span>
    </div>

    <h3 className="font-grotesk font-semibold text-[20px] text-fg mt-4 group-hover:text-acc transition-colors">
      {p.title}
    </h3>
    <p className="font-inter text-[14.5px] leading-[24px] text-mut mt-3">
      {p.description}
    </p>

    <div className="flex flex-wrap gap-2 mt-5">
      {p.metrics.map((m) => (
        <span
          key={m.t}
          className={`font-mono text-[12px] border rounded px-2 py-[3px] ${metricStyle[m.k]}`}
        >
          {m.t}
        </span>
      ))}
    </div>

    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-line/70">
      {p.tags.map((t) => (
        <span key={t} className="font-mono text-[12px] text-dim">
          #{t}
        </span>
      ))}
    </div>
  </motion.a>
);

const Projects = () => {
  const live = useLiveStats();
  const withLive = projects.map((p) =>
    p.name === "Hack36" && live?.hack36Stars
      ? {
          ...p,
          metrics: p.metrics.map((m) =>
            m.t.includes("★")
              ? { ...m, t: `${live.hack36Stars}★ on github` }
              : m
          ),
        }
      : p
  );
  return (
    <Section id="projects" index="03" kicker="projects" title="Built for speed. Benchmarked to prove it.">
      <div className="grid md:grid-cols-2 gap-6">
        {withLive.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
