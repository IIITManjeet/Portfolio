import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { openSource, socials } from "../constants";
import { useLiveStats } from "../hooks/useLive";

const statusStyle = {
  merged: "text-acc border-acc/40 bg-acc/10",
  open: "text-cy border-cy/40 bg-cy/10",
};

const owner = (repo) => repo.split("/")[0];
const avatar = (repo) => `https://github.com/${owner(repo)}.png?size=64`;
const count = (r, status) => r.prs.filter((p) => p.status === status).length;

const totals = openSource.reduce(
  (t, r) => ({ merged: t.merged + count(r, "merged"), open: t.open + count(r, "open") }),
  { merged: 0, open: 0 }
);

const OrgAvatar = ({ repo, size }) => (
  <img
    src={avatar(repo)}
    alt=""
    width={size}
    height={size}
    loading="lazy"
    decoding="async"
    className="rounded-md bg-raise border border-line shrink-0"
  />
);

const OpenSource = () => {
  const live = useLiveStats();
  return (
    <Section id="opensource" index="05" kicker="open-source" title="My code in other people's projects." size="sm">
      <p className="font-inter text-[15.5px] leading-[26px] text-mut max-w-[640px] -mt-3 mb-8">
        Recent pull requests to runtimes, schedulers, clients and contracts —
        mostly bug and correctness fixes.
      </p>

      <div className="mb-8">
        <p className="font-mono text-[12px] text-dim mb-3">
          contributed to · <span className="text-acc">{totals.merged} merged</span> ·{" "}
          <span className="text-cy">{totals.open} open</span> across {openSource.length} projects
        </p>
        <ul className="list-none grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {openSource.map((r) => {
            const merged = count(r, "merged");
            const open = count(r, "open");
            return (
              <li key={r.repo}>
                <a
                  href={`https://github.com/${owner(r.repo)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 h-full bg-panel/80 border border-line rounded-lg px-3 py-2.5 hover:border-acc/50 transition-colors group"
                >
                  <OrgAvatar repo={r.repo} size={32} />
                  <span className="min-w-0">
                    <span className="block font-grotesk font-semibold text-[14px] leading-[18px] text-fg group-hover:text-acc transition-colors">
                      {r.org}
                    </span>
                    <span className="block font-mono text-[11px] text-dim">
                      {merged > 0 && `${merged} merged`}
                      {merged > 0 && open > 0 && " · "}
                      {open > 0 && `${open} open`}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {openSource.map((r, i) => {
          const stars =
            r.repo === "Mudlet/Mudlet" && live?.mudletStars ? `${live.mudletStars}` : r.stars;
          return (
            <motion.div
              key={r.repo}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
              className="bg-panel/80 border border-line rounded-xl overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-5 py-3 border-b border-line bg-raise">
                <a
                  href={`https://github.com/${r.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 min-w-0 font-mono text-[13.5px] text-fg hover:text-acc transition-colors break-all"
                >
                  <OrgAvatar repo={r.repo} size={20} />
                  {r.repo}
                </a>
                <span className="font-mono text-[11.5px] text-dim">
                  {r.about}
                  {stars ? ` · ${stars}★` : ""}
                </span>
              </div>
              <ul className="list-none">
                {r.prs.map((pr) => (
                  <li key={pr.link} className="border-b border-line/60 last:border-b-0">
                    <a
                      href={pr.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-3 px-5 py-3 hover:bg-raise/60 transition-colors group"
                    >
                      <span
                        className={`font-mono text-[10.5px] uppercase border rounded px-1.5 py-[2px] mt-[2px] shrink-0 ${statusStyle[pr.status]}`}
                      >
                        {pr.status}
                      </span>
                      <span className="font-mono text-[12.5px] leading-[20px] text-mut group-hover:text-fg transition-colors">
                        {pr.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
      <p className="font-mono text-[13px] text-dim mt-6">
        full history:{" "}
        <a
          href="https://github.com/search?q=author%3AIIITManjeet+is%3Apr+is%3Amerged&type=pullrequests"
          target="_blank"
          rel="noreferrer"
          className="text-acc hover:underline"
        >
          merged PRs on github
        </a>{" "}
        ·{" "}
        <a href={socials.github} target="_blank" rel="noreferrer" className="text-acc hover:underline">
          github.com/IIITManjeet
        </a>
      </p>
    </Section>
  );
};

export default OpenSource;
