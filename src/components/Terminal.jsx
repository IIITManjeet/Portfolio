import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  socials,
  projects,
  experiences,
  stack,
  achievements,
} from "../constants";

const BOOT = [
  { cmd: "whoami", out: ["manjeet pathak — systems engineer @ juspay who ships UIs"] },
  {
    cmd: "./orderbook --bench",
    out: [
      "22M ops/sec · 46 ns/op · 0 heap allocs",
      "(bench = performance test: my trading engine handles 22 million orders/sec)",
    ],
  },
  { cmd: "curl ratings/live", out: ["LC 2170 ▲  CF 1605 ▲  CC 2033 ▲"] },
];

const SUGGESTIONS = ["help", "projects", "oss", "theme", "sudo hire-me"];

// onNavigate(target) is supplied by the host: "#id" scrolls to a home-page
// section, "/path" routes to a page. It returns false if the target is unknown.
const Terminal = ({ onNavigate, onToggleTheme }) => {
  const nav = useRef(onNavigate);
  nav.current = onNavigate;
  const toggleTheme = useRef(onToggleTheme);
  toggleTheme.current = onToggleTheme;
  const scrollToId = (id) => (nav.current ? nav.current(`#${id}`) !== false : false);
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
          "  oss · freelance · contact · resume · socials · theme",
          "  open <section|project> · sudo hire-me · neofetch · clear",
        ]),
      about: () =>
        out([
          "systems engineer @ juspay — distributed payments (99.995% uptime target)",
          "builds the UIs too: glasshouse (base mainnet), braid, quantout",
          "C++23 order book (22M ops/sec) · icpc regionals finalist · leetcode guardian",
        ]),
      whoami: () => out(["manjeet pathak — systems · trading · frontend"]),
      projects: () =>
        out([
          ...projects.map((p) => `  ${p.slug.padEnd(11)} ${p.title}`),
          "→ type 'open <name>' for a case study, e.g. 'open braid'",
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
          "  microsandbox (rust) · HAMi (go) · Mudlet (c++/qt) · Windmill (solidity)",
          "  + open PRs in ethrex and kubeedge/ianvs",
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
      theme: () => {
        toggleTheme.current && toggleTheme.current();
        return ok(["theme toggled"]);
      },
      neofetch: () =>
        out([
          "  ┌─ manjeet@quant ─────────────────┐",
          "  │ role     systems · trading · ui │",
          "  │ lang     c++23 rust ts haskell  │",
          "  │ uptime   99.995% target         │",
          "  │ latency  46 ns/op               │",
          "  │ rating   LC 2170 · CF 1605      │",
          "  └─────────────────────────────────┘",
        ]),
      ls: () =>
        out(["about/  experience/  projects/  lab/  oss/  ranks/  contact/"]),
      vim: () => out(["you're already in it. try ':q' — it won't help."]),
      ":q": () => out(["E37: no write since last change. you stay."]),
      exit: () => out(["session persists — this terminal ships with the site."]),
      clear: () => null,
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        projects: "projects", work: "projects", lab: "lab",
        opensource: "opensource", oss: "opensource",
        "hire-me": "services", services: "services", achievements: "achievements",
        ranks: "achievements", contact: "contact",
      };
      const slug = projects.find(
        (p) => p.slug === target || p.name.toLowerCase() === target
      )?.slug;
      const dest = slug ? `/work/${slug}` : map[target] && `#${map[target]}`;
      const okNav = dest && nav.current && nav.current(dest) !== false;
      setLines((l) => [
        ...l,
        ...newLines,
        okNav
          ? { type: "accent", text: slug ? `opening case study: ${slug} ↗` : `scrolling to ${dest} ↓` }
          : { type: "out", text: `open: no such section or project '${target}'` },
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

  // focus the prompt as soon as it exists (the terminal lives in a dialog)
  useEffect(() => {
    if (bootDone) inputRef.current?.focus();
  }, [bootDone]);

  return (
    <div
      className="w-full bg-panel border border-line rounded-xl overflow-hidden glow-acc"
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
        className="p-5 h-[min(360px,55vh)] overflow-y-auto terminal-scroll cursor-text"
        role="log"
        aria-live="polite"
        aria-label="terminal output"
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
              className="flex-1 bg-transparent border-0 outline-none focus-visible:outline-none font-mono text-[13px] text-fg caret-transparent min-w-0"
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
    </div>
  );
};

export default Terminal;
