/** @type {import('tailwindcss').Config} */

// Colors resolve to CSS variables (space-separated RGB channels) defined in
// src/index.css, so the same utility works in both themes and still supports
// opacity modifiers like `bg-acc/10`.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: token("ink"),
        panel: token("panel"),
        raise: token("raise"),
        line: token("line"),
        fg: token("fg"),
        mut: token("mut"),
        dim: token("dim"),
        acc: token("acc"),
        cy: token("cy"),
        gold: token("gold"),
        down: token("down"),
      },
    },
    fontFamily: {
      grotesk: ["'Space Grotesk'", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      mono: ["'JetBrains Mono'", "monospace"],
    },
  },
  plugins: [],
};
