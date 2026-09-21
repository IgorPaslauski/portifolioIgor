import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { PointLight } from "three";
import { sampleCamera } from "@/lib/camera-path";
import { useExperience } from "@/hooks/use-experience";

export function Lights() {
  const ember = useRef<PointLight>(null);
  const { progress, reducedMotion } = useExperience();

  useFrame(({ clock }) => {
    if (!ember.current) return;
    const pulse = reducedMotion ? 1 : 0.85 + Math.sin(clock.elapsedTime * 0.7) * 0.15;
    ember.current.intensity = sampleCamera(progress).intensity * 18 * pulse;
  });

  return (
    <>
      <ambientLight intensity={0.28} color="#c9c0ae" />
      <directionalLight position={[4.2, 6.5, 3.2]} intensity={1.15} color="#fff4e5" />
      <directionalLight position={[-6, 1.4, -3]} intensity={0.35} color="#7f8c9a" />
      <pointLight ref={ember} position={[1.4, 0.8, 2.2]} color="#e85d04" distance={14} decay={2} />
    </>
  );
}
