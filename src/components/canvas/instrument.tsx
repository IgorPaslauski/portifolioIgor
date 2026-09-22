import { Metal } from "./materials";

export function Core() {
  return (
    <group>
      <mesh>
        <octahedronGeometry args={[0.32, 0]} />
        <Metal color="#e85d04" roughness={0.16} emissive="#e85d04" emissiveIntensity={0.62} />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#ede6d6"
          metalness={0.12}
          roughness={0.06}
          transparent
          opacity={0.12}
          emissive="#e85d04"
          emissiveIntensity={0.06}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.007, 8, 64]} />
        <meshStandardMaterial color="#ede6d6" metalness={0.75} roughness={0.2} />
      </mesh>
    </group>
  );
}

export function GlyphRing({ color }: { color: string }) {
  const marks = [
    [0, 0, 0.62],
    [0.54, 0, 0.31],
    [0.54, 0, -0.31],
    [0, 0, -0.62],
    [-0.54, 0, -0.31],
    [-0.54, 0, 0.31],
  ] as const;

  return (
    <group>
      {marks.map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]} rotation={[0.4, index * 0.4, 0.2]}>
          <octahedronGeometry args={[index === 0 ? 0.09 : 0.07, 0]} />
          <Metal
            color={index % 2 === 0 ? color : "#c9c0ae"}
            roughness={0.24}
            emissive={index === 0 ? "#e85d04" : "#000000"}
            emissiveIntensity={index === 0 ? 0.35 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

export function InterfacePlate({ color }: { color: string }) {
  const frames = [
    [-0.38, 0.16, 0],
    [0.34, 0.2, 0],
    [0, -0.2, 0],
  ] as const;

  return (
    <group>
      {frames.map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]}>
          <torusGeometry args={[index === 2 ? 0.16 : 0.12, 0.008, 8, 4]} />
          <meshStandardMaterial
            color={color}
            metalness={0.45}
            roughness={0.2}
            emissive={index === 0 ? "#e85d04" : "#000"}
            emissiveIntensity={index === 0 ? 0.2 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

export function ServiceConduits({ color }: { color: string }) {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0.4]}>
        <torusGeometry args={[0.92, 0.01, 8, 48, Math.PI * 1.15]} />
        <Metal color={color} roughness={0.28} />
      </mesh>
      <mesh rotation={[0.2, Math.PI / 2, 0.15]}>
        <torusGeometry args={[0.78, 0.008, 8, 40, Math.PI]} />
        <Metal color="#8d8680" roughness={0.3} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.92, 0.08, 0]}>
          <sphereGeometry args={[0.038, 14, 14]} />
          <Metal color="#ede6d6" roughness={0.18} emissive="#e85d04" emissiveIntensity={0.22} />
        </mesh>
      ))}
    </group>
  );
}

export function DataLattice({ color }: { color: string }) {
  const nodes = [
    [-0.42, 0, -0.24],
    [0.42, 0, -0.24],
    [0, 0, 0.46],
    [-0.28, 0.22, 0.12],
    [0.28, 0.22, 0.12],
  ] as const;

  return (
    <group>
      {nodes.map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]}>
          <octahedronGeometry args={[0.045, 0]} />
          <Metal color={color} roughness={0.3} emissive={color} emissiveIntensity={0.18} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.48, 0.006, 8, 3]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.35} />
      </mesh>
    </group>
  );
}

export function OperationHalo({ color }: { color: string }) {
  return (
    <group>
      <mesh rotation={[1.15, 0.25, 0.1]}>
        <torusGeometry args={[1.12, 0.012, 8, 72]} />
        <Metal color={color} roughness={0.2} emissive="#e85d04" emissiveIntensity={0.12} />
      </mesh>
      <mesh rotation={[0.35, 0.8, 0.4]}>
        <torusGeometry args={[0.86, 0.007, 8, 56]} />
        <meshStandardMaterial color="#ede6d6" metalness={0.65} roughness={0.18} transparent opacity={0.75} />
      </mesh>
    </group>
  );
}
