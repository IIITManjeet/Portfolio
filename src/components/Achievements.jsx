import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import CountUp from "./fx/CountUp";
import { achievements } from "../constants";
import { useLiveStats } from "../hooks/useLive";
import { EASE, Stagger, spotlight } from "./motion";

const AchievementCard = ({ a, i, compact }) => {
  const Tag = a.link ? motion.a : motion.div;
  return (
    <Tag
      {...(a.link
        ? { href: a.link, target: "_blank", rel: "noreferrer" }
        : {})}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.97 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
      }}
      whileHover={a.link ? { y: -4, transition: { duration: 0.25, ease: EASE } } : undefined}
      onPointerMove={spotlight}
      className={`spotlight bg-panel/80 border border-line rounded-xl flex flex-col gap-1 no-underline ${
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
    <Section id="achievements" index="07" kicker="achievements" title="Competitive programming, by the numbers." size="sm">
      <Stagger className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.08}>
        {headline.map((a, i) => (
          <AchievementCard key={a.title} a={a} i={i} />
        ))}
      </Stagger>
      <Stagger className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-5 mt-5" stagger={0.05}>
        {rest.map((a, i) => (
          <AchievementCard key={a.title} a={a} i={i} compact />
        ))}
      </Stagger>
    </Section>
  );
};

export default Achievements;
