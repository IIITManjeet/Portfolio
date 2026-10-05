import React from "react";
import Dialog from "./ui/Dialog";
import Terminal from "./Terminal";
import { useUI } from "../context/ui";

const TerminalDialog = () => {
  const { terminalOpen, setTerminalOpen, toggleTheme, go } = useUI();
  const close = () => setTerminalOpen(false);

  const onNavigate = (target) => {
    const ok = go(target);
    if (ok !== false) setTimeout(close, 450); // let the reply line render first
    return ok;
  };

  return (
    <Dialog open={terminalOpen} onClose={close} label="Interactive terminal" className="max-w-[680px]">
      <Terminal onNavigate={onNavigate} onToggleTheme={toggleTheme} />
      <p className="mt-3 text-center font-mono text-[11.5px] text-dim">
        esc to close · ctrl/⌘ k for the command palette
      </p>
    </Dialog>
  );
};

export default TerminalDialog;
