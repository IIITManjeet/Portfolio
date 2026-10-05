import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { UIProvider } from "./context/ui";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import TerminalDialog from "./components/TerminalDialog";
import Home from "./pages/Home";

const CaseStudy = lazy(() => import("./pages/CaseStudy"));

// On route change: jump to the #hash target if there is one, else to the top.
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    let tries = 0;
    const tick = () => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView();
      else if (tries++ < 20) setTimeout(tick, 50);
    };
    tick();
  }, [pathname, hash]);
  return null;
};

function App() {
  return (
    <UIProvider>
      <a
        href="#main"
        className="skip-link font-mono text-[13px] bg-acc text-ink rounded px-3 py-2"
      >
        skip to content
      </a>
      <ScrollManager />
      <div className="relative min-h-screen">
        <Navbar />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/work/:slug"
              element={
                <Suspense fallback={<div className="min-h-screen" />}>
                  <CaseStudy />
                </Suspense>
              }
            />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <CommandPalette />
      <TerminalDialog />
    </UIProvider>
  );
}

export default App;
