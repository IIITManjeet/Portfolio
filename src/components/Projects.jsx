import React from "react";
import { Link } from "react-router-dom";
import Section from "./Section";
import { projects, moreProjects } from "../constants";
import { useLiveStats } from "../hooks/useLive";
import { EASE, Item, Stagger, spotlight } from "./motion";

export const metricStyle = {
  perf: "text-acc border-acc/30 bg-acc/[0.06]",
  cap: "text-cy border-cy/30 bg-cy/[0.06]",
};

const hoverLift = { y: -4, transition: { duration: 0.25, ease: EASE } };

const FlagshipCard = ({ p, i }) => (
  <Item
    as="article"
    whileHover={hoverLift}
    onPointerMove={spotlight}
    className="spotlight lift relative bg-panel/80 border border-line rounded-xl p-6 flex flex-col group"
  >
    <span
      aria-hidden="true"
      className="absolute top-4 right-5 font-grotesk font-bold text-[44px] leading-none text-line group-hover:text-acc/25 transition-colors duration-500 select-none"
    >
      0{i + 1}
    </span>
    <p className="font-mono text-[12.5px] text-dim pr-14">{p.kicker}</p>
    <h3 className="font-grotesk font-semibold text-[21px] leading-[28px] text-fg mt-3 pr-10 group-hover:text-acc transition-colors">
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
      <span className="font-mono text-[12.5px] text-acc inline-flex items-center gap-1.5" aria-hidden="true">
        read case study
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
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
  </Item>
);

const Projects = () => {
  const live = useLiveStats();
  return (
    <Section id="projects" index="03" kicker="selected work" title="Systems underneath, interfaces on top.">
      <Stagger className="grid md:grid-cols-2 gap-6" stagger={0.1}>
        {projects.map((p, i) => (
          <FlagshipCard key={p.slug} p={p} i={i} />
        ))}
      </Stagger>

      <h3 className="font-mono text-[13px] text-dim tracking-[0.2em] uppercase mt-14 mb-4">more projects</h3>
      <Stagger as="ul" stagger={0.05} className="list-none border-t border-line">
        {moreProjects.map((p) => (
          <Item as="li" y={12} key={p.name} className="border-b border-line">
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="group relative isolate grid sm:grid-cols-[220px_1fr_auto] gap-1 sm:gap-6 py-4 sm:px-3 overflow-hidden"
            >
              {/* row highlight sweeps in from the left */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-raise/60 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
              />
              <span className="font-grotesk font-semibold text-[16px] text-fg group-hover:text-acc transition-colors">
                {p.title}
              </span>
              <span className="font-inter text-[14px] leading-[22px] text-mut">{p.description}</span>
              <span className="font-mono text-[12px] text-dim whitespace-nowrap">
                {p.name === "Hack36" && live?.hack36Stars ? `${live.hack36Stars}★ · ` : ""}
                {p.tags.join(" · ")}{" "}
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </span>
            </a>
          </Item>
        ))}
      </Stagger>
    </Section>
  );
};

export default Projects;
