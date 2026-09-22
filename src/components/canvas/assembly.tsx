import { Html } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { assemblyLayers, type AssemblyLayer } from "@/content/assembly";
import { lerp, snapEase, smoothstep } from "@/lib/utils";
import { useExperience } from "@/hooks/use-experience";
import { Chassis, Chipset, DisplayPanel, DriveBay, Heatsink, LogicBoard } from "./workstation";

export function Assembly() {
  const root = useRef<Group>(null);
  const { ligaProgress, pointer, reducedMotion, tier } = useExperience();

  useFrame(({ clock }) => {
    if (!root.current) return;
    const built = smoothstep(0.86, 1, ligaProgress);
    const tilt = reducedMotion || tier === "low" ? 0 : 0.18;
    root.current.rotation.y = reducedMotion
      ? 0.35
      : -0.35 + ligaProgress * 0.85 + pointer.x * tilt + (built > 0.8 ? clock.elapsedTime * 0.05 : 0);
    root.current.rotation.x = 0.16 + pointer.y * tilt * 0.55;
    root.current.position.y = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.7) * 0.03 * built;
  });

  return (
    <group ref={root} position={[0, 0.05, 0]}>
      <Chassis />
      {assemblyLayers.map((layer) => (
        <Module key={layer.id} layer={layer} />
      ))}
    </group>
  );
}

function Module({ layer }: { layer: AssemblyLayer }) {
  const group = useRef<Group>(null);
  const { ligaProgress, reducedMotion, tier } = useExperience();
  const showLabel = tier !== "low" && typeof window !== "undefined" && window.innerWidth >= 1024;

  useFrame(() => {
    if (!group.current) return;
    const raw = reducedMotion ? 1 : smoothstep(layer.enter, layer.settle, ligaProgress);
    const t = reducedMotion ? 1 : snapEase(raw);
    group.current.position.set(
      lerp(layer.exploded[0], layer.dock[0], t),
      lerp(layer.exploded[1], layer.dock[1], t),
      lerp(layer.exploded[2], layer.dock[2], t),
    );
    group.current.rotation.set(
      layer.spin[0] * (1 - t),
      layer.spin[1] * (1 - t),
      layer.spin[2] * (1 - t),
    );
    group.current.visible = raw > 0.03 || reducedMotion;
  });

  const labelOpacity = reducedMotion
    ? 1
    : smoothstep(layer.enter + 0.04, layer.settle, ligaProgress) *
      (1 - smoothstep(layer.settle + 0.08, layer.settle + 0.18, ligaProgress) * 0.35);

  return (
    <group ref={group}>
      <Part layer={layer} />
      {showLabel && (
        <Html
          position={[1.15, 0.05, 0.2]}
          center
          distanceFactor={7}
          style={{
            opacity: labelOpacity,
            color: "#ede6d6",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            fontFamily: "Source Sans 3, sans-serif",
          }}
        >
          {layer.title}
        </Html>
      )}
    </group>
  );
}

function Part({ layer }: { layer: AssemblyLayer }) {
  switch (layer.kind) {
    case "drives":
      return <DriveBay color={layer.color} />;
    case "board":
      return <LogicBoard color={layer.color} />;
    case "chips":
      return <Chipset color={layer.color} />;
    case "display":
      return <DisplayPanel color={layer.color} />;
    case "heatsink":
      return <Heatsink color={layer.color} />;
    default:
      return null;
  }
}
