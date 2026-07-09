import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import OpenSource from "./components/OpenSource";
import HireMe from "./components/HireMe";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <OpenSource />
      <HireMe />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
