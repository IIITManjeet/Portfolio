/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#04070c",
        panel: "#0a0f18",
        raise: "#0e1520",
        line: "#1a2332",
        fg: "#e6edf3",
        mut: "#8b98a9",
        dim: "#6e7d90",
        acc: "#00e5a0",
        cy: "#38bdf8",
        gold: "#f0b90b",
        down: "#ff4d6d",
      },
      fontFamily: {
        grotesk: ["'Space Grotesk'", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      // legacy aliases used by older components
      Poppins: ["Inter", "sans-serif"],
    },
    fontFamily: {
      Preahvihear: ["'Space Grotesk'", "sans-serif"],
      Poppins: ["Inter", "sans-serif"],
      grotesk: ["'Space Grotesk'", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      mono: ["'JetBrains Mono'", "monospace"],
    },
  },
  plugins: [],
};
