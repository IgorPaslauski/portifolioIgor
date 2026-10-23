import { useReducedMotion } from "motion/react";
import Navbar from "../components/navbar/Navbar";
import Hero from "@/sections/Hero";
import SelectedWork from "@/sections/SelectedWork";
import Lab from "@/sections/Lab";
import Engineering from "@/sections/Engineering";
import Closing from "@/sections/Closing";
import BackToTop from "@/components/BackToTop";
import { SculptureProvider } from "@/sculpture/SculptureContext";

const Index = () => {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <SculptureProvider reducedMotion={reducedMotion}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main>
          <Hero />
          <SelectedWork />
          <Lab />
          <Engineering />
          <Closing />
          <BackToTop />
        </main>
      </div>
    </SculptureProvider>
  );
};

export default Index;
