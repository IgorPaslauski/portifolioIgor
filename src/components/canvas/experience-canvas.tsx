import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, lazy } from "react";
import { useExperience } from "@/hooks/use-experience";
import { FallbackBackdrop } from "./fallback";

const Scene = lazy(() =>
  import("./scene").then((module) => ({ default: module.Scene })),
);

export function ExperienceCanvas() {
  const { webgl, reducedMotion, tier } = useExperience();

  if (!webgl) {
    return <FallbackBackdrop contained />;
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      <FallbackBackdrop contained />
      <Canvas
        dpr={tier === "high" ? [1, 1.5] : [1, 1]}
        gl={{
          antialias: tier === "high",
          alpha: true,
          powerPreference: tier === "low" ? "low-power" : "high-performance",
          stencil: false,
        }}
        camera={{ position: [0.2, 0.15, 3.6], fov: 40, near: 0.1, far: 24 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
          <Preload all />
        </Suspense>
        {!reducedMotion && <AdaptiveDpr pixelated />}
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
