import { ContactShadows, Environment } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { PointLight, SpotLight } from "three";
import { useExperience } from "@/hooks/use-experience";

export function Atmosphere() {
  const rim = useRef<PointLight>(null);
  const key = useRef<SpotLight>(null);
  const { pointer, ligaProgress, reducedMotion, tier } = useExperience();

  useFrame(({ clock }) => {
    if (rim.current) {
      rim.current.position.x = 1.6 + pointer.x * 1.4;
      rim.current.position.y = 0.8 + pointer.y * 0.8;
      rim.current.intensity = 8 + Math.sin(clock.elapsedTime * 0.6) * 1.2;
    }
    if (key.current && !reducedMotion) {
      key.current.position.x = 2.6 + pointer.x * 0.5;
      key.current.intensity = 18 + ligaProgress * 6;
    }
  });

  return (
    <>
      <ambientLight intensity={0.22} color="#c9c0ae" />
      <spotLight
        ref={key}
        position={[2.8, 4.2, 3.4]}
        angle={0.55}
        penumbra={0.7}
        intensity={22}
        color="#fff3e2"
        castShadow={false}
      />
      <directionalLight position={[-4.5, 1.8, -2.4]} intensity={0.45} color="#8ea0b5" />
      <pointLight ref={rim} position={[1.8, 0.9, 2]} color="#e85d04" distance={10} decay={2} />
      {tier !== "low" && <Environment preset="studio" />}
      {tier !== "low" && (
        <ContactShadows position={[0, -1.46, 0]} opacity={0.45} scale={7} blur={2.6} far={2.8} color="#000000" />
      )}
    </>
  );
}
