import { ContactShadows, Environment } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { PointLight, SpotLight } from "three";
import { pointerRef } from "@/lib/pointer-ref";
import { useExperience } from "@/hooks/use-experience";

export function Atmosphere() {
  const rim = useRef<PointLight>(null);
  const key = useRef<SpotLight>(null);
  const { ligaProgress, reducedMotion, tier } = useExperience();

  useFrame(({ clock }) => {
    if (rim.current) {
      rim.current.position.x = 1.5 + pointerRef.x * 1.2;
      rim.current.position.y = 0.7 + pointerRef.y * 0.7;
      rim.current.intensity = 7.5 + Math.sin(clock.elapsedTime * 0.6) * 1.1;
    }
    if (key.current && !reducedMotion) {
      key.current.position.x = 2.4 + pointerRef.x * 0.45;
      key.current.intensity = 16 + ligaProgress * 7;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} color="#c9c0ae" />
      <spotLight
        ref={key}
        position={[2.6, 4, 3.2]}
        angle={0.52}
        penumbra={0.72}
        intensity={20}
        color="#fff3e2"
        castShadow={false}
      />
      <directionalLight position={[-4.2, 1.6, -2.2]} intensity={0.4} color="#8ea0b5" />
      <pointLight ref={rim} position={[1.7, 0.85, 1.9]} color="#e85d04" distance={10} decay={2} />
      {tier !== "low" && <Environment preset="studio" />}
      {tier !== "low" && (
        <ContactShadows position={[0, -1.15, 0]} opacity={0.32} scale={5.6} blur={2.8} far={2.2} color="#000000" />
      )}
    </>
  );
}
