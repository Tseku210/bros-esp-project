import Project from "./components/project";
import { ShootingStars } from "./components/shooting-stars";
import { StarsBackground } from "./components/stars-background";
import MainProvider from "./state/MainProvider";

function App() {
  return (
    <MainProvider>
      <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center relative w-full">
        <img
          src="pusan-logo.png"
          alt="pusan logo"
          className="absolute top-10 right-10 h-20 md:h-28"
        />
        <main className="my-28">
          <Project />
        </main>
        <ShootingStars />
        <StarsBackground />
        <div className="absolute flex flex-col bottom-10 right-10">
          <span className="italic">
            Powered by &nbsp;
            <span className="font-bold text-red-300">Garid Mandakhbayar</span>
          </span>
          <span className="text-white/30 text-sm text-center">
            Capstone Project
          </span>
        </div>
      </div>
    </MainProvider>
  );
}

export default App;
