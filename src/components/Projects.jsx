import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Section from "./Section";
import { projects, moreProjects } from "../constants";
import { useLiveStats } from "../hooks/useLive";

export const metricStyle = {
  perf: "text-acc border-acc/30 bg-acc/[0.06]",
  cap: "text-cy border-cy/30 bg-cy/[0.06]",
};

const FlagshipCard = ({ p, i }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.05 }}
    transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
    className="lift sheen relative bg-panel/80 border border-line rounded-xl p-6 flex flex-col group"
  >
    <p className="font-mono text-[12.5px] text-dim">{p.kicker}</p>
    <h3 className="font-grotesk font-semibold text-[21px] leading-[28px] text-fg mt-3 group-hover:text-acc transition-colors">
      {/* stretched link: the whole card opens the case study */}
      <Link to={`/work/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
        {p.title}
      </Link>
    </h3>
    <p className="font-inter text-[14.5px] leading-[24px] text-mut mt-3">{p.description}</p>

    <div className="flex flex-wrap gap-2 mt-5">
      {p.metrics.map((m) => (
        <span key={m.t} className={`font-mono text-[12px] border rounded px-2 py-[3px] ${metricStyle[m.k]}`}>
          {m.t}
        </span>
      ))}
    </div>

    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-auto pt-5">
      <span className="font-mono text-[12.5px] text-acc" aria-hidden="true">read case study →</span>
      {p.live && (
        <a
          href={p.live}
          target="_blank"
          rel="noreferrer"
          className="relative z-10 font-mono text-[12.5px] text-mut hover:text-acc transition-colors"
        >
          live ↗
        </a>
      )}
      {p.link && (
        <a
          href={p.link}
          target="_blank"
          rel="noreferrer"
          className="relative z-10 font-mono text-[12.5px] text-mut hover:text-acc transition-colors"
        >
          source ↗
        </a>
      )}
      {p.note && <span className="font-mono text-[12px] text-dim">{p.note}</span>}
    </div>
  </motion.article>
);

const Projects = () => {
  const live = useLiveStats();
  return (
    <Section id="projects" index="03" kicker="selected work" title="Systems underneath, interfaces on top.">
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <FlagshipCard key={p.slug} p={p} i={i} />
        ))}
      </div>

      <h3 className="font-mono text-[13px] text-dim tracking-[0.2em] uppercase mt-14 mb-4">more projects</h3>
      <ul className="list-none border-t border-line">
        {moreProjects.map((p) => (
          <li key={p.name} className="border-b border-line">
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="group grid sm:grid-cols-[220px_1fr_auto] gap-1 sm:gap-6 py-4 hover:bg-raise/50 transition-colors sm:px-3"
            >
              <span className="font-grotesk font-semibold text-[16px] text-fg group-hover:text-acc transition-colors">
                {p.title}
              </span>
              <span className="font-inter text-[14px] leading-[22px] text-mut">{p.description}</span>
              <span className="font-mono text-[12px] text-dim whitespace-nowrap">
                {p.name === "Hack36" && live?.hack36Stars ? `${live.hack36Stars}★ · ` : ""}
                {p.tags.join(" · ")} ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Projects;
