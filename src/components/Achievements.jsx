import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import CountUp from "./fx/CountUp";
import { achievements } from "../constants";
import { useLiveStats } from "../hooks/useLive";

const AchievementCard = ({ a, i, compact }) => {
  const Tag = a.link ? motion.a : motion.div;
  return (
    <Tag
      {...(a.link
        ? { href: a.link, target: "_blank", rel: "noreferrer" }
        : {})}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
      className={`bg-panel/80 border border-line rounded-xl flex flex-col gap-1 no-underline ${
        compact ? "p-4" : "p-5"
      } ${a.link ? "lift cursor-pointer" : ""}`}
    >
      <span
        className={`font-mono font-bold text-acc ${
          compact ? "text-[20px] leading-[28px]" : "text-[32px] leading-[40px]"
        }`}
      >
        <CountUp value={a.stat} />
      </span>
      <span
        className={`font-grotesk font-semibold text-fg ${
          compact ? "text-[14px]" : "text-[16px]"
        }`}
      >
        {a.title}
      </span>
      <span className="font-inter text-[12.5px] leading-[18px] text-dim">
        {a.detail}
      </span>
    </Tag>
  );
};

const Achievements = () => {
  const live = useLiveStats();
  const withLive = achievements.map((a) => {
    if (a.title === "Codeforces Expert" && live?.cf) {
      return {
        ...a,
        stat: String(live.cf.maxRating),
        detail: `${a.detail} · live: ${live.cf.rating}`,
      };
    }
    return a;
  });
  const headline = withLive.slice(0, 4);
  const rest = withLive.slice(4);
  return (
    <Section id="achievements" index="06" kicker="achievements" title="Rated. Ranked. Repeatable." size="sm">
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-5">
        {headline.map((a, i) => (
          <AchievementCard key={a.title} a={a} i={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {rest.map((a, i) => (
          <AchievementCard key={a.title} a={a} i={i} compact />
        ))}
      </div>
    </Section>
  );
};

export default Achievements;
