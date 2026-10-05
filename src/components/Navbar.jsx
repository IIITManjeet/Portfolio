import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import { useUI } from "../context/ui";
import { MoonIcon, SunIcon } from "./fx/Icons";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

const Navbar = () => {
  const { go, setPaletteOpen, theme, toggleTheme } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Real hrefs keep middle-click / copy-link working; clicks route in-app.
  const sectionLink = (id, extra) => ({
    href: `/#${id}`,
    onClick: (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      setOpen(false);
      go(`#${id}`);
      extra?.();
    },
  });

  const ThemeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="w-9 h-9 inline-flex items-center justify-center rounded border border-line text-mut hover:text-acc hover:border-acc/50 transition-colors bg-transparent cursor-pointer"
    >
      {theme === "light" ? <MoonIcon size={15} /> : <SunIcon size={15} />}
    </button>
  );

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors ${
        scrolled || open
          ? "bg-ink/90 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-acc to-cy"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <nav
        aria-label="Primary"
        className="max-w-[1120px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between gap-4"
      >
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-[15px] text-fg hover:text-acc transition-colors shrink-0"
          aria-label="Manjeet Pathak — home"
        >
          <span className="text-acc">manjeet</span>
          <span className="text-dim">@</span>
          <span className="text-cy">pathak</span>
          <span className="text-dim">:~$</span>
          <span className="cursor-blink text-acc ml-1" aria-hidden="true">▌</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-5 list-none whitespace-nowrap">
          {navLinks.map((nav, i) => (
            <li key={nav.id}>
              <a
                {...sectionLink(nav.id)}
                className="font-mono text-[13px] text-mut hover:text-acc transition-colors"
              >
                <span className="text-dim">0{i + 1}.</span>
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
            aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
            className="hidden sm:inline-flex items-center gap-2 h-9 font-mono text-[12px] text-mut border border-line rounded px-3 hover:text-acc hover:border-acc/50 transition-colors bg-transparent cursor-pointer"
          >
            <span>search</span>
            <kbd className="text-dim">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          {ThemeButton}
          <a
            {...sectionLink("contact")}
            className="hidden xl:inline-flex items-center h-9 font-mono text-[12px] text-acc border border-acc/40 rounded px-3 hover:bg-acc/10 transition-colors"
          >
            ● open to work
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
            className="lg:hidden w-9 h-9 inline-flex items-center justify-center font-mono text-acc text-[20px] bg-transparent border border-line rounded cursor-pointer"
          >
            {open ? "✕" : "≡"}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="lg:hidden px-6 pb-5">
          <ul className="flex flex-col gap-1 list-none pt-2">
            {navLinks.map((nav, i) => (
              <li key={nav.id}>
                <a
                  {...sectionLink(nav.id)}
                  className="block py-2.5 font-mono text-[14px] text-mut hover:text-acc"
                >
                  <span className="text-dim">0{i + 1}.</span> {nav.title}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setPaletteOpen(true);
                }}
                className="w-full text-left py-2.5 font-mono text-[14px] text-mut hover:text-acc bg-transparent border-0 cursor-pointer"
              >
                <span className="text-dim">›</span> search / commands
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
