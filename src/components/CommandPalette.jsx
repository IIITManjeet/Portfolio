import React, { useEffect, useMemo, useRef, useState } from "react";
import Dialog from "./ui/Dialog";
import { useUI } from "../context/ui";
import { navLinks, projects, socials } from "../constants";

// Subsequence match with a bonus for consecutive characters and word starts;
// returns -1 when the query isn't a subsequence of the text.
const score = (text, query) => {
  if (!query) return 0;
  const t = text.toLowerCase();
  const q = query.toLowerCase();
  let ti = 0;
  let s = 0;
  let streak = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, ti);
    if (found === -1) return -1;
    streak = found === ti ? streak + 1 : 0;
    s += 1 + streak * 2 + (found === 0 || t[found - 1] === " " ? 3 : 0);
    ti = found + 1;
  }
  return s - t.length * 0.01;
};

const sectionLabel = {
  about: "About",
  experience: "Experience",
  projects: "Selected work",
  lab: "Lab — order-split explorer",
  opensource: "Open source",
  achievements: "Rankings",
  contact: "Contact",
};

const CommandPalette = () => {
  const { paletteOpen, setPaletteOpen, setTerminalOpen, toggleTheme, theme, go } = useUI();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const listRef = useRef(null);

  const close = () => setPaletteOpen(false);

  const commands = useMemo(() => {
    const external = (href) => () => window.open(href, "_blank", "noopener");
    return [
      ...navLinks.map((n) => ({
        id: `go-${n.id}`,
        group: "Go to",
        label: sectionLabel[n.id] || n.title,
        hint: `#${n.id}`,
        run: () => go(`#${n.id}`),
      })),
      { id: "go-top", group: "Go to", label: "Top of page", hint: "home", run: () =>
          window.location.pathname === "/"
            ? window.scrollTo({ top: 0, behavior: "smooth" })
            : go("/"),
      },
      ...projects.map((p) => ({
        id: `cs-${p.slug}`,
        group: "Case studies",
        label: p.title,
        hint: p.kicker,
        run: () => go(`/work/${p.slug}`),
      })),
      {
        id: "terminal",
        group: "Actions",
        label: "Open terminal",
        hint: "`",
        run: () => setTerminalOpen(true),
      },
      {
        id: "theme",
        group: "Actions",
        label: `Switch to ${theme === "light" ? "dark" : "light"} theme`,
        hint: "theme",
        run: toggleTheme,
      },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: socials.email,
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(socials.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          } catch (e) {
            window.location.href = `mailto:${socials.email}`;
          }
        },
      },
      { id: "resume", group: "Actions", label: "Open resume (PDF)", hint: "resume.pdf", run: external("/resume.pdf") },
      { id: "gh", group: "Links", label: "GitHub", hint: "IIITManjeet", run: external(socials.github) },
      { id: "li", group: "Links", label: "LinkedIn", hint: "manjeet-pathak", run: external(socials.linkedin) },
      { id: "lc", group: "Links", label: "LeetCode", hint: "conqueror_61_m", run: external(socials.leetcode) },
      { id: "cf", group: "Links", label: "Codeforces", hint: "Manjeet_Pathak", run: external(socials.codeforces) },
      ...projects
        .filter((p) => p.live)
        .map((p) => ({
          id: `live-${p.slug}`,
          group: "Links",
          label: `${p.name} — live`,
          hint: p.live.replace(/^https?:\/\//, ""),
          run: external(p.live),
        })),
    ];
  }, [go, setTerminalOpen, theme, toggleTheme]);

  const results = useMemo(() => {
    if (!query.trim()) return commands;
    return commands
      .map((c) => ({ c, s: Math.max(score(c.label, query), score(`${c.group} ${c.hint}`, query) - 2) }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => b.s - a.s)
      .map((r) => r.c);
  }, [commands, query]);

  useEffect(() => {
    if (paletteOpen) {
      setQuery("");
      setActive(0);
    }
  }, [paletteOpen]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const execute = (cmd) => {
    if (!cmd) return;
    if (!cmd.keepOpen) close();
    // let the dialog restore focus before navigating/scrolling
    requestAnimationFrame(() => cmd.run());
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Home") {
      setActive(0);
    } else if (e.key === "End") {
      setActive(results.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      execute(results[active]);
    }
  };

  let lastGroup = null;

  return (
    <Dialog open={paletteOpen} onClose={close} label="Command palette" className="max-w-[600px]">
      <div className="bg-panel border border-line rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-line">
          <span className="font-mono text-acc text-[15px]" aria-hidden="true">›</span>
          <input
            data-autofocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search sections, projects, actions…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
            aria-autocomplete="list"
            className="flex-1 bg-transparent border-0 outline-none focus-visible:outline-none py-4 font-inter text-[16px] text-fg placeholder:text-dim"
            autoComplete="off"
            spellCheck="false"
          />
          <kbd className="font-mono text-[11px] text-dim border border-line rounded px-1.5 py-0.5">esc</kbd>
        </div>

        <ul
          id="palette-list"
          ref={listRef}
          role="listbox"
          aria-label="Commands"
          className="max-h-[min(420px,55vh)] overflow-y-auto py-2 list-none terminal-scroll"
        >
          {results.length === 0 && (
            <li className="px-4 py-6 font-mono text-[13px] text-dim">no matches — try “braid” or “theme”</li>
          )}
          {results.map((c, i) => {
            const header = c.group !== lastGroup;
            lastGroup = c.group;
            return (
              <React.Fragment key={c.id}>
                {header && (
                  <li role="presentation" className="px-4 pt-3 pb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                    {c.group}
                  </li>
                )}
                <li
                  id={`cmd-${c.id}`}
                  data-index={i}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => execute(c)}
                  className={`mx-2 px-3 py-2.5 rounded-lg flex items-center justify-between gap-4 cursor-pointer ${
                    i === active ? "bg-acc/10 text-fg" : "text-mut"
                  }`}
                >
                  <span className="font-inter text-[14.5px] truncate">
                    {c.id === "copy-email" && copied ? "Copied ✓" : c.label}
                  </span>
                  <span className="font-mono text-[11.5px] text-dim truncate max-w-[45%]">{c.hint}</span>
                </li>
              </React.Fragment>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-line bg-raise/60 font-mono text-[11px] text-dim">
          <span><kbd>↑↓</kbd> move</span>
          <span><kbd>↵</kbd> run</span>
          <span className="ml-auto"><kbd>`</kbd> terminal</span>
        </div>
      </div>
    </Dialog>
  );
};

export default CommandPalette;
