import type { ColorRepresentation } from "three";

export function Metal({
  color,
  roughness = 0.3,
  emissive = "#000000",
  emissiveIntensity = 0,
}: {
  color: ColorRepresentation;
  roughness?: number;
  emissive?: ColorRepresentation;
  emissiveIntensity?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={0.84}
      roughness={roughness}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity}
      envMapIntensity={1.15}
    />
  );
}

export function Plastic({ color, roughness = 0.48 }: { color: ColorRepresentation; roughness?: number }) {
  return <meshStandardMaterial color={color} metalness={0.18} roughness={roughness} envMapIntensity={0.55} />;
}
