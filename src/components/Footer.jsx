import React from "react";
import { socials } from "../constants";

const Footer = () => (
  <footer className="border-t border-line mt-10">
    <div className="max-w-[1120px] mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="font-mono text-[12.5px] text-mut">
        <span className="text-acc">-- NORMAL --</span>{" "}
        <span className="text-fg">main</span> · utf-8 · react+tailwind
      </p>
      <p className="font-mono text-[12.5px] text-mut">
        © {new Date().getFullYear()} manjeet pathak ·{" "}
        <a
          href={socials.github}
          target="_blank"
          rel="noreferrer"
          className="text-mut hover:text-acc transition-colors"
        >
          github
        </a>{" "}
        ·{" "}
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-mut hover:text-acc transition-colors"
        >
          linkedin
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
