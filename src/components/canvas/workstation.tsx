import { RoundedBox } from "@react-three/drei";
import { Metal, Plastic } from "./materials";

export function Chassis() {
  return (
    <group>
      <RoundedBox args={[1.86, 0.1, 1.28]} radius={0.03} position={[0, -1.38, 0]}>
        <Metal color="#1c1814" roughness={0.34} />
      </RoundedBox>
      <RoundedBox args={[0.07, 1.72, 1.2]} radius={0.018} position={[-0.86, -0.48, 0]}>
        <Metal color="#2a2420" roughness={0.28} />
      </RoundedBox>
      <RoundedBox args={[0.07, 1.72, 1.2]} radius={0.018} position={[0.86, -0.48, 0]}>
        <Metal color="#2a2420" roughness={0.28} />
      </RoundedBox>
      <RoundedBox args={[1.86, 0.05, 1.28]} radius={0.02} position={[0, 0.72, 0]}>
        <Metal color="#241f1b" roughness={0.32} />
      </RoundedBox>
      <mesh position={[0.62, -1.3, 0.58]}>
        <cylinderGeometry args={[0.035, 0.035, 0.05, 16]} />
        <Metal color="#e85d04" roughness={0.22} emissive="#e85d04" emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

export function DriveBay({ color }: { color: string }) {
  return (
    <group>
      {[-0.38, 0, 0.38].map((x) => (
        <RoundedBox key={x} args={[0.34, 0.22, 0.92]} radius={0.02} position={[x, 0, 0]}>
          <Metal color={color} roughness={0.38} />
        </RoundedBox>
      ))}
      <RoundedBox args={[1.28, 0.06, 1.02]} radius={0.012} position={[0, -0.16, 0]}>
        <Plastic color="#12100e" />
      </RoundedBox>
    </group>
  );
}

export function LogicBoard({ color }: { color: string }) {
  return (
    <group>
      <RoundedBox args={[1.42, 0.035, 0.98]} radius={0.012}>
        <Plastic color="#1a3a2a" roughness={0.55} />
      </RoundedBox>
      {[
        [-0.42, 0.04, -0.22],
        [0.18, 0.03, 0.16],
        [0.46, 0.025, -0.28],
        [-0.12, 0.03, 0.28],
      ].map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]}>
          <boxGeometry args={[0.16, 0.03, 0.12]} />
          <Metal color={index === 0 ? color : "#b7aea0"} roughness={0.4} />
        </mesh>
      ))}
      {Array.from({ length: 10 }).map((_, index) => (
        <mesh key={`trace-${index}`} position={[-0.55 + index * 0.12, 0.02, 0.4]}>
          <boxGeometry args={[0.015, 0.008, 0.14]} />
          <meshStandardMaterial color="#c9a227" metalness={0.7} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export function Chipset({ color }: { color: string }) {
  return (
    <group>
      <RoundedBox args={[0.42, 0.08, 0.42]} radius={0.02}>
        <Metal color={color} roughness={0.26} emissive={color} emissiveIntensity={0.16} />
      </RoundedBox>
      <mesh position={[0, 0.08, 0]}>
        <icosahedronGeometry args={[0.11, 0]} />
        <Metal color="#ede6d6" roughness={0.18} emissive="#e85d04" emissiveIntensity={0.28} />
      </mesh>
      {[
        [-0.38, 0, -0.22],
        [0.4, 0, 0.18],
        [-0.28, 0, 0.32],
      ].map(([x, y, z], index) => (
        <RoundedBox key={index} args={[0.16, 0.045, 0.16]} radius={0.01} position={[x, y, z]}>
          <Metal color="#cfc6b6" roughness={0.32} />
        </RoundedBox>
      ))}
    </group>
  );
}

export function DisplayPanel({ color }: { color: string }) {
  return (
    <group>
      <RoundedBox args={[1.52, 0.92, 0.05]} radius={0.03}>
        <Metal color="#161311" roughness={0.22} />
      </RoundedBox>
      <RoundedBox args={[1.38, 0.78, 0.02]} radius={0.012} position={[0, 0, 0.028]}>
        <meshStandardMaterial
          color={color}
          metalness={0.35}
          roughness={0.12}
          emissive={color}
          emissiveIntensity={0.2}
          envMapIntensity={1.3}
        />
      </RoundedBox>
      <mesh position={[-0.42, 0.22, 0.042]}>
        <boxGeometry args={[0.18, 0.08, 0.01]} />
        <meshStandardMaterial color="#090807" />
      </mesh>
      <mesh position={[-0.38, 0.22, 0.05]}>
        <boxGeometry args={[0.045, 0.045, 0.01]} />
        <meshStandardMaterial color="#e85d04" emissive="#e85d04" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

export function Heatsink({ color }: { color: string }) {
  return (
    <group>
      {Array.from({ length: 9 }).map((_, index) => (
        <mesh key={index} position={[-0.4 + index * 0.1, 0.12, 0]}>
          <boxGeometry args={[0.035, 0.32, 0.72]} />
          <Metal color={color} roughness={0.24} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.28, 0]}>
        <torusGeometry args={[0.22, 0.018, 8, 28]} />
        <Metal color="#ede6d6" roughness={0.2} emissive="#e85d04" emissiveIntensity={0.12} />
      </mesh>
    </group>
  );
}
