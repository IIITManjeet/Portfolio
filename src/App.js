import About from "./components/About";
import Experience from "./components/Experience";
import { MastHead } from "./components/MastHead";
import { Navbar } from "./components/Navbar";
import { ScrollBar } from "./components/ScrollBar";

function App() {
  return (
    <div className="flex flex-col relative min-h-screen">
      <div className="fixed rounded-full bg-[#D41EF1B0] blur-[150px] opacity-[0.30] z-0 right-0 top-[-220px] h-[400px] w-[400px] absolute" />
      <div className="fixed rounded-[400px] bg-[#D41EF1B0] blur-[200px] opacity-[0.30] top-[500px] left-[-150px] h-[400px] w-[400px] absolute" />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <MastHead />
        <ScrollBar to="about" />
      </div>
      <About />
      <Experience />
    </div>
  );
}

export default App;
