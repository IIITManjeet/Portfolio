import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "../constants";
import caseStudies from "../constants/caseStudies";
import { metricStyle } from "../components/Projects";
import { spotlight } from "../components/motion";

const SplitExplorer = lazy(() => import("../components/showcase/SplitExplorer"));
const LiveOrderBook = lazy(() => import("../components/showcase/LiveOrderBook"));

// Inline, working demos for projects that have an in-site counterpart.
const demos = {
  braid: {
    title: "Try the idea",
    note: "A simplified in-browser model of the router — the real one is Rust, checked against both Move VMs.",
    Component: SplitExplorer,
    height: 640,
  },
  orderbook: {
    title: "A book, live",
    note: "The same price-time-priority structure, rendered in React from Binance's public stream (or a local matching engine when it's unreachable).",
    Component: LiveOrderBook,
    height: 452,
  },
};

const SECTIONS = [
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "frontend", label: "The interface" },
  { id: "demo", label: "Demo" },
  { id: "evidence", label: "Evidence" },
  { id: "stack", label: "Stack" },
];

const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
};

const Block = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-28 pt-12 first:pt-0">
    <h2 className="font-grotesk font-bold text-[clamp(22px,2.6vw,28px)] text-fg mb-5">{title}</h2>
    {children}
  </section>
);

const Bullets = ({ items }) => (
  <ul className="list-none flex flex-col gap-4">
    {items.map((t) => (
      <li key={t} className="font-inter text-[16px] leading-[28px] text-mut pl-5 relative">
        <span className="absolute left-0 top-[1px] text-acc font-mono" aria-hidden="true">›</span>
        {t}
      </li>
    ))}
  </ul>
);

const NotFound = () => (
  <div className="section-shell pt-40 pb-24">
    <p className="font-mono text-[13px] text-acc">404 / case study</p>
    <h1 className="font-grotesk font-bold text-[40px] text-fg mt-2">No such project.</h1>
    <Link to="/#projects" className="font-mono text-[14px] text-acc hover:underline mt-6 inline-block">
      ← back to all work
    </Link>
  </div>
);

const CaseStudy = () => {
  const { slug } = useParams();
  const reduce = useReducedMotion();
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx];
  const study = caseStudies[slug];
  const demo = demos[slug];
  const sections = SECTIONS.filter((s) => s.id !== "demo" || demo);
  const active = useActiveSection(sections.map((s) => s.id));

  useEffect(() => {
    if (!project) return undefined;
    const prev = document.title;
    document.title = `${project.name} · case study · Manjeet Pathak`;
    return () => {
      document.title = prev;
    };
  }, [project]);

  if (!project || !study) return <NotFound />;
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="section-shell pt-28 sm:pt-32 pb-16">
      <Link to="/#projects" className="font-mono text-[13px] text-mut hover:text-acc transition-colors">
        ← all work
      </Link>

      <motion.header
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 max-w-[860px]"
      >
        <p className="font-mono text-[13px] text-acc tracking-[0.12em]">{project.kicker}</p>
        <h1 className="font-grotesk font-bold text-[clamp(34px,5.5vw,58px)] leading-[1.08] text-fg mt-3">
          {project.title}
        </h1>
        <p className="font-inter text-[clamp(18px,2vw,21px)] leading-[1.6] text-mut mt-6">{study.summary}</p>

        <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-4 mt-8 font-mono text-[13px]">
          <div>
            <dt className="text-dim">when</dt>
            <dd className="text-fg mt-1">{study.period}</dd>
          </div>
          <div>
            <dt className="text-dim">role</dt>
            <dd className="text-fg mt-1">{study.role}</dd>
          </div>
        </dl>

        {study.links.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-8">
            {study.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={`font-mono text-[13px] rounded px-4 py-2.5 transition-colors ${
                  i === 0
                    ? "bg-acc text-ink font-semibold hover:opacity-90"
                    : "border border-line text-fg hover:border-acc/60 hover:text-acc"
                }`}
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
        {study.note && <p className="font-mono text-[12px] text-dim mt-4">{study.note}</p>}
      </motion.header>

      <div className="grid lg:grid-cols-[180px_minmax(0,1fr)] gap-12 mt-16 pt-12 border-t border-line">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="list-none sticky top-28 flex flex-col gap-1 border-l border-line">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(s.id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
                  }}
                  aria-current={active === s.id ? "location" : undefined}
                  className={`block font-mono text-[12.5px] pl-4 py-1.5 -ml-px border-l transition-colors ${
                    active === s.id ? "text-acc border-acc" : "text-dim border-transparent hover:text-fg"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 max-w-[760px]">
          <Block id="problem" title="The problem">
            <Bullets items={study.problem} />
          </Block>
          <Block id="approach" title="The approach">
            <Bullets items={study.approach} />
          </Block>
          <Block id="frontend" title="The interface">
            <div className="bg-panel/70 border border-line rounded-xl p-6 glow-cy">
              <p className="font-mono text-[12px] text-cy mb-4">/frontend — what I built for people to use</p>
              <Bullets items={study.frontend} />
            </div>
          </Block>

          {demo && (
            <Block id="demo" title={demo.title}>
              <p className="font-inter text-[15px] leading-[26px] text-mut mb-6">{demo.note}</p>
              <Suspense
                fallback={
                  <div
                    style={{ height: demo.height }}
                    className="bg-panel/80 border border-line rounded-xl"
                    aria-hidden="true"
                  />
                }
              >
                <demo.Component />
              </Suspense>
            </Block>
          )}

          <Block id="evidence" title="Evidence">
            <div className="border border-line rounded-xl overflow-x-auto" tabIndex={0} role="region" aria-label="Evidence table">
              <table className="w-full text-left min-w-[480px]">
                <caption className="sr-only">Measured results and verifiable facts for {project.name}</caption>
                <thead className="bg-raise">
                  <tr>
                    <th scope="col" className="font-mono text-[11.5px] uppercase tracking-[0.15em] text-dim font-normal px-5 py-3">
                      what
                    </th>
                    <th scope="col" className="font-mono text-[11.5px] uppercase tracking-[0.15em] text-dim font-normal px-5 py-3">
                      result
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {study.evidence.map((e) => (
                    <tr key={e.k} className="border-t border-line">
                      <th scope="row" className="font-inter text-[14.5px] text-mut font-normal px-5 py-3.5">
                        {e.k}
                      </th>
                      <td className="px-5 py-3.5">
                        <span className={`font-mono text-[12.5px] border rounded px-2 py-[3px] whitespace-nowrap ${metricStyle[e.kind]}`}>
                          {e.v}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {study.evidenceNote && (
              <p className="font-mono text-[12px] leading-[20px] text-dim mt-4">{study.evidenceNote}</p>
            )}
          </Block>

          <Block id="stack" title="Stack">
            <div className="flex flex-wrap gap-2">
              {study.stack.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </Block>

          <Link
            to={`/work/${next.slug}`}
            onPointerMove={spotlight}
            className="spotlight lift block mt-16 bg-panel/80 border border-line rounded-xl p-6 group"
          >
            <p className="font-mono text-[12px] text-dim">next case study →</p>
            <p className="font-grotesk font-semibold text-[22px] text-fg mt-2 group-hover:text-acc transition-colors">
              {next.title}
            </p>
            <p className="font-mono text-[12.5px] text-mut mt-1">{next.kicker}</p>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CaseStudy;
