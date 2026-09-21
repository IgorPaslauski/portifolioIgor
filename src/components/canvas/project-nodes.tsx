import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { featuredProjects } from "@/content";
import { useExperience } from "@/hooks/use-experience";

const SLOTS: [number, number, number][] = [
  [2.4, 0.35, 0.4],
  [-2.15, -0.15, 0.8],
  [0.15, 1.55, -1.1],
  [1.7, -1.1, -0.6],
  [-1.45, 1.05, -1.35],
];

export function ProjectNodes() {
  const group = useRef<Group>(null);
  const { hoveredCase, chapter, reducedMotion, progress } = useExperience();
  const visible = chapter === "obras" || chapter === "sistema";

  useFrame(({ clock }) => {
    if (!group.current) return;
    const target = visible ? 1 : 0.18;
    group.current.scale.lerp({ x: target, y: target, z: target } as never, 0.04);
    group.current.children.forEach((child, index) => {
      child.position.y = SLOTS[index][1] + (reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.7 + index) * 0.08);
      child.rotation.y = clock.elapsedTime * 0.15 + index;
    });
    group.current.rotation.y = reducedMotion ? 0 : progress * 0.6;
  });

  return (
    <group ref={group}>
      {featuredProjects.slice(0, 5).map((project, index) => (
        <Node key={project.slug} slug={project.slug} color={project.accent} position={SLOTS[index]} active={hoveredCase === project.slug} />
      ))}
    </group>
  );
}

function Node({
  slug,
  color,
  position,
  active,
}: {
  slug: string;
  color: string;
  position: [number, number, number];
  active: boolean;
}) {
  const mesh = useRef<Mesh>(null);

  useFrame(() => {
    if (!mesh.current) return;
    const scale = active ? 1.35 : 1;
    mesh.current.scale.lerp({ x: scale, y: scale, z: scale } as never, 0.12);
  });

  return (
    <mesh ref={mesh} position={position} userData={{ slug }}>
      <boxGeometry args={[0.42, 0.58, 0.08]} />
      <meshStandardMaterial
        color={color}
        metalness={0.35}
        roughness={0.28}
        emissive={color}
        emissiveIntensity={active ? 0.55 : 0.12}
      />
    </mesh>
  );
}
