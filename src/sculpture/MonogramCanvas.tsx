import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import MonogramModel from "./MonogramModel";
import { createStudioEnvMap } from "./studioEnv";

export type MonogramCanvasProps = {
  onPresented: () => void;
  onFail: () => void;
};

export default function MonogramCanvas({ onPresented, onFail }: MonogramCanvasProps) {
  const [narrow, setNarrow] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 1024
  );

  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    const kick = requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    return () => {
      cancelAnimationFrame(kick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const saveData =
    typeof navigator !== "undefined" &&
    "connection" in navigator &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  // Desktop: up to 2× for cleaner silhouettes; still demand-mode (no continuous burn).
  const maxDpr = narrow || saveData ? 1.25 : 2;

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, maxDpr]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      }}
      camera={{ position: [0.55, 0.2, 5.8], fov: 30, near: 0.1, far: 40 }}
      style={{ pointerEvents: "none", width: "100%", height: "100%" }}
      onCreated={({ gl, scene, invalidate }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.outputColorSpace = SRGBColorSpace;
        gl.setClearColor(0x0b0d10, 1);
        try {
          const envMap = createStudioEnvMap(gl);
          scene.environment = envMap;
          if (typeof window !== "undefined") {
            (window as Window & { __studioEnv?: boolean }).__studioEnv = true;
          }
        } catch {
          if (typeof window !== "undefined") {
            (window as Window & { __studioEnv?: boolean }).__studioEnv = false;
          }
        }
        invalidate();
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onFail();
        });
        gl.domElement.addEventListener("webglcontextrestored", () => {
          invalidate();
        });
      }}
    >
      <hemisphereLight args={["#F4F7FA", "#0A0D12", 0.4]} />
      {/* Key — warm, catches bevels from above-right */}
      <directionalLight position={[4.2, 6.0, 3.0]} intensity={2.8} color="#FFF3E4" />
      {/* Rim — cool edge separation on dark bg */}
      <directionalLight position={[-3.6, 1.8, -3.2]} intensity={1.35} color="#8FA0B4" />
      {/* Fill — soft front so recesses don't crush to black */}
      <directionalLight position={[0.2, 2.0, 5.0]} intensity={0.7} color="#DCE4EE" />
      <ambientLight intensity={0.08} color="#B8C0CA" />
      <MonogramModel onPresented={onPresented} onFail={onFail} />
    </Canvas>
  );
}
