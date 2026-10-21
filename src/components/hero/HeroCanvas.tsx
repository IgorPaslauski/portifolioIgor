import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Group, PerspectiveCamera } from "three";
import SystemSculpture from "./SystemSculpture";

export type SceneTarget = { x: number; y: number };

export type HeroCanvasProps = {
  target: React.MutableRefObject<SceneTarget>;
  invalidateRef: React.MutableRefObject<() => void>;
  bone: string;
  signal: string;
  graphite: string;
  onPresented: () => void;
  onFail: () => void;
};

function SculptureRig({
  target,
  bone,
  signal,
  graphite,
  compact,
  invalidateRef,
  onPresented,
}: {
  target: React.MutableRefObject<SceneTarget>;
  bone: string;
  signal: string;
  graphite: string;
  compact: boolean;
  invalidateRef: React.MutableRefObject<() => void>;
  onPresented: () => void;
}) {
  const group = useRef<Group>(null);
  const presented = useRef(false);
  const { camera, invalidate } = useThree();
  invalidateRef.current = invalidate;

  useEffect(() => {
    const view = camera as PerspectiveCamera;
    view.position.set(compact ? 0 : 0.45, compact ? 0.05 : 0.15, compact ? 5.1 : 6.3);
    view.fov = compact ? 32 : 30;
    view.updateProjectionMatrix();
    invalidate();
  }, [camera, compact, invalidate, bone, signal, graphite]);

  useFrame(() => {
    const node = group.current;
    if (!node) return;
    if (!presented.current) {
      presented.current = true;
      onPresented();
    }
    const dx = target.current.x - node.rotation.x;
    const dy = target.current.y - node.rotation.y;
    node.rotation.x += dx * 0.08;
    node.rotation.y += dy * 0.08;
    if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) invalidate();
  });

  return (
    <group ref={group} rotation={[0.12, -0.35, 0]}>
      <SystemSculpture bone={bone} signal={signal} graphite={graphite} compact={compact} />
    </group>
  );
}

export default function HeroCanvas({
  target,
  invalidateRef,
  bone,
  signal,
  graphite,
  onPresented,
  onFail,
}: HeroCanvasProps) {
  const [narrow, setNarrow] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    // react-use-measure (inside Canvas) drops its first observation if it
    // arrives before the mounted flag. A resize after paint starts the scene.
    const kick = requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    return () => {
      cancelAnimationFrame(kick);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  const saveData =
    typeof navigator !== "undefined" &&
    "connection" in navigator &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  const maxDpr = narrow || saveData ? 1 : 1.5;

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, maxDpr]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: narrow ? [0, 0.05, 5.1] : [0.45, 0.15, 6.3], fov: narrow ? 32 : 30 }}
      style={{ pointerEvents: "none", width: "100%", height: "100%" }}
      onCreated={({ gl, invalidate }) => {
        gl.setClearColor(0x000000, 0);
        invalidate();
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onFail();
        });
      }}
    >
      <hemisphereLight args={["#FFF4EA", "#2A2622", 0.85]} />
      <directionalLight position={[4.2, 5.4, 6]} intensity={2.1} color="#FFF8F2" />
      <directionalLight position={[-3.5, -1.2, -2]} intensity={0.7} color={signal} />
      <SculptureRig
        target={target}
        bone={bone}
        signal={signal}
        graphite={graphite}
        compact={narrow}
        invalidateRef={invalidateRef}
        onPresented={onPresented}
      />
    </Canvas>
  );
}
