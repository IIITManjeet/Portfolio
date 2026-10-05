import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { UIProvider } from "./context/ui";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import TerminalDialog from "./components/TerminalDialog";
import Home from "./pages/Home";
import { EASE } from "./components/motion";

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

// Cross-fade between pages; keyed by pathname so hash jumps don't re-animate.
// The first page skips the fade so the hero's own entrance plays on its own.
// (initial={false} on AnimatePresence would instead suppress every
// descendant's entrance animation.)
let firstPage = true;
const Page = ({ children }) => {
  const [skip] = React.useState(() => {
    const s = firstPage;
    firstPage = false;
    return s;
  });
  return (
    <motion.div
      initial={skip ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route
          path="/work/:slug"
          element={
            <Page>
              <Suspense fallback={<div className="min-h-screen" />}>
                <CaseStudy />
              </Suspense>
            </Page>
          }
        />
        <Route path="*" element={<Page><Home /></Page>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <MotionConfig reducedMotion="user">
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
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
        <CommandPalette />
        <TerminalDialog />
      </UIProvider>
    </MotionConfig>
  );
}

export default App;
