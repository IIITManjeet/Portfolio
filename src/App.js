import { MastHead } from "./components/MastHead";
import { Navbar } from "./components/Navbar";
import { ScrollBar } from "./components/ScrollBar";

function App() {
  return (
    <div className="flex flex-col relative min-h-screen">
      <div className="fixed rounded-full bg-[#D41EF1B0] blur-[150px] opacity-[0.30] z-0 right-0 top-[-220px] h-[400px] w-[400px] absolute" />
      <div className="fixed rounded-[400px] bg-[#D41EF1B0] blur-[200px] opacity-[0.30] top-[300px] left-[-150px] h-[400px] w-[400px] absolute" />
      <Navbar />
      <MastHead />
      <ScrollBar />
    </div>
  );
}

export default App;
