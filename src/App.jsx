import Background from "./components/backgrounds/Background";
//import IntroReveal from "./components/overlays/IntroReveal";
import Navbar from "./components/layout/Navbar";
//import BirdsLayer from "./components/overlays/BirdsLayer";
import Hero from "./components/sections/Hero";

export default function App() {
  return (
    <>
      <Background />
      
      
      <Navbar />
      <Hero />
    </>
  );
}
