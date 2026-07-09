import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  socials,
  projects,
  experiences,
  stack,
  achievements,
} from "../constants";

const BOOT = [
  { cmd: "whoami", out: ["manjeet pathak — backend engineer @ juspay"] },
  {
    cmd: "./orderbook --bench",
    out: [
      "22M ops/sec · 46 ns/op · 0 heap allocs",
      "(bench = performance test: my trading engine handles 22 million orders/sec)",
    ],
  },
  { cmd: "curl ratings/live", out: ["LC 2170 ▲  CF 1605 ▲  CC 2033 ▲"] },
];

const SUGGESTIONS = ["help", "projects", "ratings", "sudo hire-me"];

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
  return !!el;
};

const Terminal = () => {
  const [bootIdx, setBootIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [bootDone, setBootDone] = useState(false);
  const [lines, setLines] = useState([]); // {type: 'cmd'|'out'|'accent', text}
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histPos, setHistPos] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // boot typing animation
  useEffect(() => {
    if (bootIdx >= BOOT.length) {
      const t = setTimeout(() => setBootDone(true), 300);
      return () => clearTimeout(t);
    }
    const target = BOOT[bootIdx].cmd;
    if (typed.length < target.length) {
      const t = setTimeout(
        () => setTyped(target.slice(0, typed.length + 1)),
        16
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLines((l) => [
        ...l,
        { type: "cmd", text: target },
        ...BOOT[bootIdx].out.map((o) => ({ type: "out", text: o })),
      ]);
      setTyped("");
      setBootIdx((i) => i + 1);
    }, 140);
    return () => clearTimeout(t);
  }, [typed, bootIdx]);

  // keep scrolled to bottom
  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, typed, bootDone]);

  const commands = useMemo(() => {
    const out = (arr) => arr.map((t) => ({ type: "out", text: t }));
    const ok = (arr) => arr.map((t) => ({ type: "accent", text: t }));
    return {
      help: () =>
        out([
          "commands:",
          "  about · projects · experience · skills · ratings",
          "  oss · freelance · contact · resume · socials",
          "  open <section> · sudo hire-me · neofetch · clear",
        ]),
      about: () =>
        out([
          "backend engineer @ juspay — distributed payments (99.995% uptime target)",
          "quant dev: C++23 order book (22M ops/sec) · rust trading engine",
          "icpc regionals finalist · leetcode guardian (top 1.13%)",
        ]),
      whoami: () => out(["manjeet pathak — backend · quant · web3"]),
      projects: () =>
        out([
          ...projects.map((p) => `  ~/${p.name} — ${p.title}`),
          "→ type 'open projects' to view cards",
        ]),
      experience: () =>
        out([
          ...experiences
            .slice(0, 4)
            .map((e) => `  ${e.title} @ ${e.company_name} (${e.date.toLowerCase()})`),
          "→ type 'open experience' for the full timeline",
        ]),
      skills: () => out(stack.map((s) => `  /${s.group}: ${s.items.join(", ")}`)),
      ratings: () =>
        out(achievements.map((a) => `  ${a.stat.padEnd(6)} ${a.title} — ${a.detail}`)),
      achievements: () =>
        out(achievements.map((a) => `  ${a.stat.padEnd(6)} ${a.title} — ${a.detail}`)),
      oss: () =>
        out([
          "  Mudlet/Mudlet (C++, 880+★): merged profile-copy fix, open crash fix",
          "  8+ merged PRs across community repos",
          "→ type 'open opensource'",
        ]),
      freelance: () =>
        out([
          "  FW-Defence — delivered end-to-end (NDA, references on request)",
          "  available for quant / backend / web3 engagements",
          "→ type 'contact' to start one",
        ]),
      contact: () => {
        scrollToId("contact");
        return ok(["opening contact form... say hi ↓"]);
      },
      hire: () => {
        scrollToId("contact");
        return ok(["opening contact form... say hi ↓"]);
      },
      resume: () => {
        window.open("/resume.pdf", "_blank");
        return ok(["opening resume.pdf ↗"]);
      },
      socials: () =>
        out([
          `  github      ${socials.github}`,
          `  linkedin    ${socials.linkedin}`,
          `  leetcode    ${socials.leetcode}`,
          `  codeforces  ${socials.codeforces}`,
          `  codechef    ${socials.codechef}`,
          `  atcoder     ${socials.atcoder}`,
          `  email       ${socials.email}`,
        ]),
      github: () => {
        window.open(socials.github, "_blank");
        return ok(["opening github ↗"]);
      },
      linkedin: () => {
        window.open(socials.linkedin, "_blank");
        return ok(["opening linkedin ↗"]);
      },
      leetcode: () => {
        window.open(socials.leetcode, "_blank");
        return ok(["opening leetcode ↗"]);
      },
      codeforces: () => {
        window.open(socials.codeforces, "_blank");
        return ok(["opening codeforces ↗"]);
      },
      codechef: () => {
        window.open(socials.codechef, "_blank");
        return ok(["opening codechef ↗"]);
      },
      atcoder: () => {
        window.open(socials.atcoder, "_blank");
        return ok(["opening atcoder ↗"]);
      },
      email: () => {
        window.open(`mailto:${socials.email}`);
        return ok([`mailto:${socials.email}`]);
      },
      neofetch: () =>
        out([
          "  ┌─ manjeet@quant ─────────────────┐",
          "  │ role     backend · quant · web3 │",
          "  │ lang     c++23 rust haskell ts  │",
          "  │ uptime   99.995% target         │",
          "  │ latency  46 ns/op               │",
          "  │ rating   LC 2170 · CF 1605      │",
          "  └─────────────────────────────────┘",
        ]),
      ls: () =>
        out(["about/  experience/  projects/  oss/  hire-me/  contact/"]),
      vim: () => out(["you're already in it. try ':q' — it won't help."]),
      ":q": () => out(["E37: no write since last change. you stay."]),
      exit: () => out(["session persists — this terminal ships with the site."]),
      clear: () => null,
    };
  }, []);

  const run = (raw) => {
    const text = raw.trim();
    if (!text) return;
    const newLines = [{ type: "cmd", text }];
    const lower = text.toLowerCase();

    if (lower === "clear") {
      setLines([]);
      return;
    }
    if (lower === "sudo hire-me" || lower === "sudo hire me") {
      scrollToId("contact");
      setLines((l) => [
        ...l,
        ...newLines,
        { type: "accent", text: "[sudo] permission granted — opening contact form ↓" },
      ]);
      return;
    }
    if (lower.startsWith("open ")) {
      const target = lower.slice(5).trim().replace("open-source", "opensource");
      const map = {
        about: "about", experience: "experience", exp: "experience",
        projects: "projects", opensource: "opensource", oss: "opensource",
        "hire-me": "work", work: "work", achievements: "achievements",
        ranks: "achievements", contact: "contact",
      };
      const id = map[target];
      const okScroll = id && scrollToId(id);
      setLines((l) => [
        ...l,
        ...newLines,
        okScroll
          ? { type: "accent", text: `scrolling to #${id} ↓` }
          : { type: "out", text: `open: no such section '${target}'` },
      ]);
      return;
    }
    const fn = commands[lower];
    const result = fn
      ? fn()
      : [
          {
            type: "out",
            text: `zsh: command not found: ${text} — try 'help'`,
          },
        ];
    setLines((l) => [...l, ...newLines, ...(result || [])]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setHistory((h) => [input, ...h]);
      setHistPos(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histPos + 1, history.length - 1);
      if (history[next]) {
        setHistPos(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histPos - 1;
      setHistPos(next);
      setInput(next >= 0 ? history[next] : "");
    }
  };

  const lineColor = { cmd: "text-fg", out: "text-mut", accent: "text-acc" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.6 }}
      className="w-full bg-panel/90 border border-line rounded-xl overflow-hidden glow-acc"
      onClick={() => inputRef.current && inputRef.current.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-raise">
        <span className="w-3 h-3 rounded-full bg-down/80" />
        <span className="w-3 h-3 rounded-full bg-gold/80" />
        <span className="w-3 h-3 rounded-full bg-acc/80" />
        <span className="font-mono text-[12px] text-dim ml-3">
          manjeet@quant: ~/portfolio — interactive, try 'help'
        </span>
      </div>

      <div
        ref={bodyRef}
        className="p-5 h-[300px] sm:h-[330px] overflow-y-auto terminal-scroll cursor-text"
      >
        {lines.map((line, i) => (
          <p
            key={i}
            className={`font-mono text-[13px] leading-[21px] whitespace-pre-wrap break-words ${lineColor[line.type]}`}
          >
            {line.type === "cmd" ? (
              <>
                <span className="text-acc">$ </span>
                {line.text}
              </>
            ) : (
              line.text
            )}
          </p>
        ))}

        {!bootDone ? (
          <p className="font-mono text-[13px] leading-[21px] text-fg">
            <span className="text-acc">$ </span>
            {typed}
            <span className="cursor-blink text-acc">▌</span>
          </p>
        ) : (
          <div className="flex items-center font-mono text-[13px] leading-[21px]">
            <span className="text-acc">$&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="terminal input — type help"
              className="flex-1 bg-transparent border-0 outline-none font-mono text-[13px] text-fg caret-transparent min-w-0"
              autoComplete="off"
              spellCheck="false"
            />
            <span className="cursor-blink text-acc -ml-1 pointer-events-none">
              ▌
            </span>
          </div>
        )}
      </div>

      {bootDone && (
        <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-line/60 bg-raise/60">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={(e) => {
                e.stopPropagation();
                run(s);
                inputRef.current && inputRef.current.focus();
              }}
              className="font-mono text-[11.5px] text-mut border border-line rounded px-2 py-[3px] hover:text-acc hover:border-acc/50 transition-colors cursor-pointer bg-transparent"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Terminal;
