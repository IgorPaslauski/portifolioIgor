import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { useExperience } from "@/hooks/use-experience";

function Ring({
  radius,
  rotation,
  speed,
}: {
  radius: number;
  rotation: [number, number, number];
  speed: number;
}) {
  const ref = useRef<Mesh>(null);
  const { reducedMotion, progress } = useExperience();

  useFrame(({ clock }) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.z = clock.elapsedTime * speed + progress * 0.8;
  });

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.012, 8, 96]} />
      <meshBasicMaterial color="#ede6d6" transparent opacity={0.28} />
    </mesh>
  );
}

export function Engine() {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const { pointer, progress, reducedMotion, chapter } = useExperience();
  const hot = chapter === "obras";
  const quiet = chapter === "canal" || chapter === "caderno";

  const shards = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => {
        const angle = (index / 10) * Math.PI * 2;
        return {
          position: [Math.cos(angle) * 1.85, Math.sin(angle * 1.4) * 0.55, Math.sin(angle) * 1.85] as [
            number,
            number,
            number,
          ],
          scale: 0.08 + (index % 3) * 0.03,
        };
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current || !core.current) return;
    const t = clock.elapsedTime;
    const tilt = reducedMotion ? 0 : 0.22;
    group.current.rotation.y = reducedMotion ? 0.3 : t * 0.12 + progress * 1.15;
    group.current.rotation.x = 0.28 + pointer.y * tilt;
    group.current.rotation.z = pointer.x * tilt * 0.6;
    core.current.rotation.y = reducedMotion ? 0 : -t * 0.22;
    const breathe = reducedMotion ? 1 : 1 + Math.sin(t * 0.9) * 0.03;
    core.current.scale.setScalar(breathe);
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#1a1612"
          metalness={0.72}
          roughness={0.28}
          emissive={hot ? "#e85d04" : quiet ? "#1a1612" : "#5c2a10"}
          emissiveIntensity={hot ? 0.42 : quiet ? 0.04 : 0.16}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.08, 1]} />
        <meshBasicMaterial color="#e85d04" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial color="#ede6d6" metalness={0.4} roughness={0.2} emissive="#e85d04" emissiveIntensity={0.2} />
      </mesh>
      <Ring radius={1.85} rotation={[Math.PI / 2.4, 0.3, 0]} speed={0.18} />
      <Ring radius={2.25} rotation={[1.1, -0.4, 0.6]} speed={-0.12} />
      <Ring radius={2.7} rotation={[0.25, 1.1, 0.2]} speed={0.08} />
      {shards.map((shard, index) => (
        <mesh key={index} position={shard.position} scale={shard.scale}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#c9c0ae" metalness={0.5} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}
