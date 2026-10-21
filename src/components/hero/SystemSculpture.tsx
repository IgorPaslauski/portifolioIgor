type SculptureProps = {
  bone: string;
  signal: string;
  graphite: string;
};

function Ring({
  width,
  height,
  thickness,
  color,
  rotation,
  position,
}: {
  width: number;
  height: number;
  thickness: number;
  color: string;
  rotation: [number, number, number];
  position: [number, number, number];
}) {
  const rail = thickness;
  return (
    <group rotation={rotation} position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width + rail, rail, rail]} />
        <meshStandardMaterial color={color} metalness={0.82} roughness={0.18} />
      </mesh>
      <mesh position={[0, -height / 2, 0]}>
        <boxGeometry args={[width + rail, rail, rail]} />
        <meshStandardMaterial color={color} metalness={0.82} roughness={0.18} />
      </mesh>
      <mesh position={[-width / 2, 0, 0]}>
        <boxGeometry args={[rail, height, rail]} />
        <meshStandardMaterial color={color} metalness={0.82} roughness={0.18} />
      </mesh>
      <mesh position={[width / 2, 0, 0]}>
        <boxGeometry args={[rail, height, rail]} />
        <meshStandardMaterial color={color} metalness={0.82} roughness={0.18} />
      </mesh>
    </group>
  );
}

export default function SystemSculpture({ bone, signal, graphite, compact = false }: SculptureProps & { compact?: boolean }) {
  return (
    <group scale={compact ? 0.82 : 0.74} position={compact ? [0.05, -0.42, 0] : [0.28, 0.42, 0]}>
      <Ring
        width={2.15}
        height={2.85}
        thickness={0.09}
        color={bone}
        rotation={[0.42, 0.55, 0.08]}
        position={[0, 0.05, 0]}
      />
      <Ring
        width={1.55}
        height={2.15}
        thickness={0.11}
        color={signal}
        rotation={[0.15, -0.95, 0.42]}
        position={[0.18, -0.08, 0.22]}
      />
      <Ring
        width={1.15}
        height={1.55}
        thickness={0.08}
        color={graphite}
        rotation={[-0.5, 0.2, -0.35]}
        position={[-0.22, 0.18, -0.18]}
      />
    </group>
  );
}
