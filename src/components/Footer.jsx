import React from "react";
import { socials } from "../constants";
import { GithubIcon, LinkedinIcon } from "./fx/Icons";

const Footer = () => (
  <footer className="border-t border-line mt-10">
    <div className="max-w-[1120px] mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="font-mono text-[12.5px] text-mut">
        <span className="text-acc">-- NORMAL --</span>{" "}
        <span className="text-fg">main</span> · utf-8 · react+tailwind
      </p>
      <p className="font-mono text-[12.5px] text-mut flex items-center gap-3">
        © {new Date().getFullYear()} manjeet pathak
        <a
          href={socials.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-mut hover:text-acc transition-colors inline-flex"
        >
          <GithubIcon size={15} />
        </a>
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="text-mut hover:text-acc transition-colors inline-flex"
        >
          <LinkedinIcon size={15} />
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
