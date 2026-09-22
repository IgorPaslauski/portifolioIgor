import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute, Points } from "three";
import { useExperience } from "@/hooks/use-experience";

export function Field() {
  const points = useRef<Points>(null);
  const { ligaProgress, tier, reducedMotion } = useExperience();
  const count = tier === "high" ? 280 : 120;

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 2.6 + Math.random() * 6.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame(({ clock }) => {
    if (!points.current || reducedMotion) return;
    points.current.rotation.y = clock.elapsedTime * 0.016 + ligaProgress * 0.28;
    points.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.07;
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled>
      <pointsMaterial
        color="#c9c0ae"
        size={0.016}
        sizeAttenuation
        transparent
        opacity={0.38}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
