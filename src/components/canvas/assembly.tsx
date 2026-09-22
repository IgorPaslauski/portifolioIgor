import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { assemblyLayers, type AssemblyLayer } from "@/content/assembly";
import { pointerRef } from "@/lib/pointer-ref";
import { lerp, snapEase, smoothstep } from "@/lib/utils";
import { useExperience } from "@/hooks/use-experience";
import { Core, DataLattice, GlyphRing, InterfacePlate, OperationHalo, ServiceConduits } from "./instrument";

export function Assembly() {
  const root = useRef<Group>(null);
  const { ligaProgress, reducedMotion, tier } = useExperience();

  useFrame(({ clock }) => {
    if (!root.current) return;
    const built = smoothstep(0.82, 1, ligaProgress);
    const tilt = reducedMotion || tier === "low" ? 0 : 0.16;
    root.current.rotation.y = reducedMotion
      ? 0.28
      : -0.28 + ligaProgress * 0.72 + pointerRef.x * tilt + (built > 0.8 ? clock.elapsedTime * 0.06 : 0);
    root.current.rotation.x = 0.12 + pointerRef.y * tilt * 0.5;
    root.current.position.y = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.65) * 0.028 * built;
  });

  return (
    <group ref={root} position={[0, 0.02, 0]}>
      <CoreGate />
      {assemblyLayers.map((layer) => (
        <Module key={layer.id} layer={layer} />
      ))}
    </group>
  );
}

function CoreGate() {
  const group = useRef<Group>(null);
  const { ligaProgress, reducedMotion } = useExperience();

  useFrame(() => {
    if (!group.current) return;
    const t = reducedMotion ? 1 : smoothstep(0.1, 0.3, ligaProgress);
    group.current.position.y = lerp(-0.28, 0, t);
    group.current.scale.setScalar(lerp(0.72, 1, t));
    group.current.visible = t > 0.04 || reducedMotion;
  });

  return (
    <group ref={group}>
      <Core />
    </group>
  );
}

function Module({ layer }: { layer: AssemblyLayer }) {
  const group = useRef<Group>(null);
  const { ligaProgress, reducedMotion } = useExperience();

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
    const hot = raw > 0.2 && raw < 0.98;
    group.current.scale.setScalar(lerp(0.9, hot ? 1.05 : 1, raw));
    group.current.visible = raw > 0.03 || reducedMotion;
  });

  return (
    <group ref={group}>
      <Part layer={layer} />
    </group>
  );
}

function Part({ layer }: { layer: AssemblyLayer }) {
  switch (layer.kind) {
    case "glyphs":
      return <GlyphRing color={layer.color} />;
    case "plate":
      return <InterfacePlate color={layer.color} />;
    case "conduits":
      return <ServiceConduits color={layer.color} />;
    case "lattice":
      return <DataLattice color={layer.color} />;
    case "halo":
      return <OperationHalo color={layer.color} />;
    default:
      return null;
  }
}
