import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { openSource, socials } from "../constants";
import { useLiveStats } from "../hooks/useLive";

const statusStyle = {
  merged: "text-acc border-acc/40 bg-acc/10",
  open: "text-cy border-cy/40 bg-cy/10",
};

const OpenSource = () => {
  const live = useLiveStats();
  const entries = openSource.map((pr) =>
    pr.repo === "Mudlet/Mudlet" && live?.mudletStars
      ? { ...pr, stars: pr.stars.replace("880+★", `${live.mudletStars}★`) }
      : pr
  );
  return (
    <Section id="opensource" index="04" kicker="open-source" title="My code in other people's projects." size="sm">
      <div className="bg-panel/80 border border-line rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-line bg-raise">
          <span className="font-mono text-[12.5px] text-dim">
            $ git log --author="IIITManjeet" --merges --all
          </span>
        </div>
        <div>
          {entries.map((pr, i) => (
            <motion.a
              key={pr.link}
              href={pr.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-5 py-4 border-b border-line/60 last:border-b-0 no-underline hover:bg-raise/70 transition-colors group"
            >
              <span
                className={`font-mono text-[11.5px] uppercase border rounded px-2 py-[3px] w-fit shrink-0 ${statusStyle[pr.status]}`}
              >
                {pr.status}
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[13.5px] text-fg group-hover:text-acc transition-colors">
                  {pr.title}
                </p>
                <p className="font-mono text-[12px] text-dim mt-1">
                  {pr.repo} · {pr.stars}
                </p>
              </div>
              <span className="font-mono text-[12px] text-dim sm:ml-auto shrink-0 group-hover:text-acc transition-colors">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
      <p className="font-mono text-[13px] text-dim mt-5">
        more on{" "}
        <a
          href={socials.github}
          target="_blank"
          rel="noreferrer"
          className="text-acc hover:underline"
        >
          github.com/IIITManjeet
        </a>
      </p>
    </Section>
  );
};

export default OpenSource;
