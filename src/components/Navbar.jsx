import React, { useEffect, useState } from "react";
import { navLinks } from "../constants";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled
          ? "bg-ink/95 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-acc to-cy transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-mono text-[15px] text-fg hover:text-acc transition-colors"
        >
          <span className="text-acc">manjeet</span>
          <span className="text-dim">@</span>
          <span className="text-cy">quant</span>
          <span className="text-dim">:~$</span>
          <span className="cursor-blink text-acc ml-1">▌</span>
        </a>

        <ul className="hidden lg:flex items-center gap-5 xl:gap-6 list-none whitespace-nowrap">
          {navLinks.map((nav, i) => (
            <li key={nav.id}>
              <a
                href={`#${nav.id}`}
                className="font-mono text-[13px] text-mut hover:text-acc transition-colors whitespace-nowrap"
              >
                <span className="text-dim">0{i + 1}.</span>{nav.title}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[13px] text-mut hover:text-acc transition-colors whitespace-nowrap"
            >
              resume↓
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="font-mono text-[12px] text-acc border border-acc/40 rounded px-3 py-[6px] hover:bg-acc/10 transition-colors whitespace-nowrap"
            >
              ● open to work
            </a>
          </li>
        </ul>

        <button
          aria-label="menu"
          onClick={() => setOpen(!open)}
          className="lg:hidden font-mono text-acc text-[20px] bg-transparent border-0 cursor-pointer"
        >
          {open ? "✕" : "≡"}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-ink/95 backdrop-blur-md border-b border-line px-6 pb-5">
          <ul className="flex flex-col gap-4 list-none pt-2">
            {navLinks.map((nav, i) => (
              <li key={nav.id}>
                <a
                  href={`#${nav.id}`}
                  onClick={() => setOpen(false)}
                  className="font-mono text-[14px] text-mut hover:text-acc"
                >
                  <span className="text-dim">0{i + 1}.</span> {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
