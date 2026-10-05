import { useCallback, useEffect, useState } from "react";

const read = () =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

// Theme lives on <html data-theme>, set before paint by the inline script in
// index.html. This hook keeps React in sync and persists explicit choices.
export function useTheme() {
  const [theme, setTheme] = useState(read);

  useEffect(() => {
    const obs = new MutationObserver(() => setTheme(read()));
    obs.observe(document.documentElement, { attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const toggle = useCallback(() => {
    const next = read() === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "light" ? "#f6f7f9" : "#04070c");
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* storage blocked: the choice still applies for this visit */
    }
  }, []);

  return { theme, toggle };
}
