import { RoundedBox } from "@react-three/drei";
import { Metal, Plastic } from "./materials";

export function Core() {
  return (
    <group>
      <mesh>
        <octahedronGeometry args={[0.28, 0]} />
        <Metal color="#e85d04" roughness={0.18} emissive="#e85d04" emissiveIntensity={0.55} />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          color="#ede6d6"
          metalness={0.15}
          roughness={0.08}
          transparent
          opacity={0.14}
          emissive="#e85d04"
          emissiveIntensity={0.08}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.006, 8, 48]} />
        <meshStandardMaterial color="#c9c0ae" metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  );
}

export function GlyphRing({ color }: { color: string }) {
  const marks = [
    [-0.42, 0, 0.22],
    [0, 0, 0.46],
    [0.42, 0, 0.22],
    [0.42, 0, -0.22],
    [0, 0, -0.46],
    [-0.42, 0, -0.22],
  ] as const;

  return (
    <group>
      {marks.map(([x, y, z], index) => (
        <RoundedBox key={index} args={[0.16, 0.07, 0.16]} radius={0.012} position={[x, y, z]}>
          <Metal
            color={index % 2 === 0 ? color : "#c9c0ae"}
            roughness={0.28}
            emissive={index === 0 ? "#e85d04" : "#000000"}
            emissiveIntensity={index === 0 ? 0.22 : 0}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

export function InterfacePlate({ color }: { color: string }) {
  return (
    <group>
      <RoundedBox args={[1.18, 0.72, 0.04]} radius={0.02}>
        <meshStandardMaterial
          color="#161311"
          metalness={0.4}
          roughness={0.16}
          transparent
          opacity={0.88}
        />
      </RoundedBox>
      <RoundedBox args={[1.04, 0.58, 0.02]} radius={0.01} position={[0, 0, 0.018]}>
        <meshStandardMaterial
          color={color}
          metalness={0.2}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.12}
          transparent
          opacity={0.35}
        />
      </RoundedBox>
      {[
        [-0.28, 0.12, 0.03],
        [0.22, 0.16, 0.03],
        [-0.12, -0.14, 0.03],
      ].map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]}>
          <boxGeometry args={[index === 2 ? 0.42 : 0.28, index === 1 ? 0.1 : 0.16, 0.01]} />
          <meshStandardMaterial color="#ede6d6" transparent opacity={0.45} />
        </mesh>
      ))}
      <mesh position={[0.4, 0.2, 0.032]}>
        <boxGeometry args={[0.05, 0.05, 0.01]} />
        <meshStandardMaterial color="#e85d04" emissive="#e85d04" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

export function ServiceConduits({ color }: { color: string }) {
  return (
    <group>
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * 0.78, 0.08, 0]} rotation={[0, 0, side * 0.55]}>
            <cylinderGeometry args={[0.018, 0.018, 0.9, 10]} />
            <Metal color={color} roughness={0.3} />
          </mesh>
          <mesh position={[side * 1.12, 0.42, 0.08]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <Metal color="#ede6d6" roughness={0.2} emissive="#e85d04" emissiveIntensity={0.18} />
          </mesh>
        </group>
      ))}
      <mesh rotation={[Math.PI / 2, 0, Math.PI / 2]} position={[0, 0.18, 0]}>
        <torusGeometry args={[0.78, 0.012, 8, 32, Math.PI]} />
        <Metal color="#8d8680" roughness={0.32} />
      </mesh>
    </group>
  );
}

export function DataLattice({ color }: { color: string }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.92, 6, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.55}
          roughness={0.35}
          emissive={color}
          emissiveIntensity={0.2}
          side={2}
        />
      </mesh>
      {[-0.28, 0, 0.28].map((x) =>
        [-0.24, 0.24].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.05, z]}>
            <boxGeometry args={[0.12, 0.04, 0.12]} />
            <Plastic color="#1c1814" roughness={0.5} />
          </mesh>
        )),
      )}
    </group>
  );
}

export function OperationHalo({ color }: { color: string }) {
  return (
    <group>
      <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[1.05, 0.018, 10, 64]} />
        <Metal color={color} roughness={0.22} emissive="#e85d04" emissiveIntensity={0.15} />
      </mesh>
      <mesh rotation={[0.3, 0, Math.PI / 3]}>
        <torusGeometry args={[0.82, 0.008, 8, 48]} />
        <meshStandardMaterial color="#ede6d6" metalness={0.6} roughness={0.2} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}
