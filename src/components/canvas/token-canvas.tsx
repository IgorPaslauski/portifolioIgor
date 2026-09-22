import { AdaptiveDpr } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute, Points } from "three";
import { useInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { usePerformanceTier } from "@/hooks/use-performance-tier";
import { useWebGL } from "@/hooks/use-webgl";

export function TokenCanvas() {
  const { ref, visible } = useInView<HTMLDivElement>(0.15);
  const webgl = useWebGL();
  const reducedMotion = usePrefersReducedMotion();
  const tier = usePerformanceTier();

  if (!webgl || tier === "low") {
    return <div ref={ref} className="absolute inset-0 token-fallback" aria-hidden />;
  }

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden>
      {visible && (
        <Canvas
          dpr={[1, 1.25]}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power", stencil: false }}
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          style={{ background: "transparent" }}
        >
          <TokenField reduced={reducedMotion} count={tier === "high" ? 90 : 48} />
          {!reducedMotion && <AdaptiveDpr pixelated />}
        </Canvas>
      )}
    </div>
  );
}

function TokenField({ reduced, count }: { reduced: boolean; count: number }) {
  const points = useRef<Points>(null);
  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame(({ clock }) => {
    if (!points.current || reduced) return;
    points.current.rotation.y = clock.elapsedTime * 0.08;
    points.current.rotation.x = Math.sin(clock.elapsedTime * 0.12) * 0.12;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#e85d04"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
