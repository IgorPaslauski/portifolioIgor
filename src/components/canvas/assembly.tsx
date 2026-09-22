import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { assemblyLayers } from "@/content/assembly";
import { lerp, smoothstep } from "@/lib/utils";
import { useExperience } from "@/hooks/use-experience";

export function Assembly() {
  const root = useRef<Group>(null);
  const { ligaProgress, pointer, reducedMotion } = useExperience();

  useFrame(({ clock }) => {
    if (!root.current) return;
    const tilt = reducedMotion ? 0 : 0.16;
    const spin = reducedMotion ? 0.15 : 0.08 + ligaProgress * 0.35;
    root.current.rotation.y = clock.elapsedTime * 0.04 + spin;
    root.current.rotation.x = 0.18 + pointer.y * tilt;
    root.current.rotation.z = pointer.x * tilt * 0.45;
  });

  return (
    <group ref={root}>
      <Spine />
      <Core />
      {assemblyLayers.map((layer) => (
        <Layer key={layer.id} layer={layer} />
      ))}
    </group>
  );
}

function Spine() {
  return (
    <mesh>
      <cylinderGeometry args={[0.045, 0.045, 2.7, 16]} />
      <meshStandardMaterial color="#2c2722" metalness={0.7} roughness={0.28} />
    </mesh>
  );
}

function Core() {
  const mesh = useRef<Mesh>(null);
  const { ligaProgress, reducedMotion } = useExperience();

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const compact = 1 - smoothstep(0.2, 0.42, ligaProgress) * 0.28;
    const pulse = reducedMotion ? 1 : 1 + Math.sin(clock.elapsedTime * 0.8) * 0.02;
    mesh.current.scale.setScalar(compact * pulse);
    mesh.current.rotation.y = reducedMotion ? 0.4 : clock.elapsedTime * 0.18;
  });

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial
          color="#1a1612"
          metalness={0.74}
          roughness={0.24}
          emissive="#e85d04"
          emissiveIntensity={0.18}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.445, 1]} />
        <meshBasicMaterial color="#e85d04" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Layer({ layer }: { layer: (typeof assemblyLayers)[number] }) {
  const group = useRef<Group>(null);
  const { ligaProgress, reducedMotion } = useExperience();

  useFrame(() => {
    if (!group.current) return;
    const t = reducedMotion ? 1 : smoothstep(layer.enter, layer.settle, ligaProgress);
    group.current.position.set(
      lerp(layer.exploded[0], layer.dock[0], t),
      lerp(layer.exploded[1], layer.dock[1], t),
      lerp(layer.exploded[2], layer.dock[2], t),
    );
    group.current.rotation.y = (1 - t) * 0.8;
    group.current.scale.setScalar(lerp(0.55, 1, t));
    group.current.visible = t > 0.02 || reducedMotion;
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.92 - layer.index * 0.05, 0.028, 10, 48]} />
        <meshStandardMaterial
          color={layer.color}
          metalness={0.55}
          roughness={0.32}
          emissive={layer.color}
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.86 - layer.index * 0.05, 0.86 - layer.index * 0.05, 0.045, 32]} />
        <meshStandardMaterial color="#14110e" metalness={0.45} roughness={0.4} transparent opacity={0.92} />
      </mesh>
      {layer.items.slice(0, 6).map((item, index) => {
        const angle = (index / 6) * Math.PI * 2;
        const radius = 0.62 - layer.index * 0.03;
        return (
          <mesh
            key={item}
            position={[Math.cos(angle) * radius, 0.08, Math.sin(angle) * radius]}
            scale={0.09}
          >
            <boxGeometry args={[1, 0.45, 1]} />
            <meshStandardMaterial color={layer.color} metalness={0.4} roughness={0.35} />
          </mesh>
        );
      })}
    </group>
  );
}
