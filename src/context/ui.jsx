import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

const UIContext = createContext(null);

const isTyping = (el) =>
  el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);

export function UIProvider({ children }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // "#id" → section on the home page (routing there first if needed),
  // "/path" → client-side route. Returns false for an unknown section.
  const go = useCallback(
    (target) => {
      if (target.startsWith("#")) {
        if (pathname !== "/") {
          navigate(`/${target}`);
          return true;
        }
        const el = document.getElementById(target.slice(1));
        if (!el) return false;
        el.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", target);
        return true;
      }
      navigate(target);
      return true;
    },
    [navigate, pathname]
  );

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen(false);
        setPaletteOpen((o) => !o);
      } else if (e.key === "`" && !isTyping(document.activeElement)) {
        e.preventDefault();
        setPaletteOpen(false);
        setTerminalOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(
    () => ({
      paletteOpen,
      setPaletteOpen,
      terminalOpen,
      setTerminalOpen,
      theme,
      toggleTheme,
      go,
    }),
    [paletteOpen, terminalOpen, theme, toggleTheme, go]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const useUI = () => useContext(UIContext);
