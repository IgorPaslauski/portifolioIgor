import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { sampleCamera } from "@/lib/camera-path";
import { pointerRef } from "@/lib/pointer-ref";
import { useExperience } from "@/hooks/use-experience";

export function CameraRig() {
  const { camera } = useThree();
  const { ligaProgress, reducedMotion, tier } = useExperience();
  const look = useRef(new Vector3());
  const desired = useRef(new Vector3());
  const target = useRef(new Vector3());

  useFrame(() => {
    const frame = sampleCamera(reducedMotion ? 1 : ligaProgress);
    const parallax = reducedMotion || tier === "low" ? 0 : 0.38;

    desired.current.set(
      frame.position[0] + pointerRef.x * parallax,
      frame.position[1] + pointerRef.y * parallax * 0.45,
      frame.position[2],
    );

    camera.position.lerp(desired.current, reducedMotion ? 1 : 0.055);
    target.current.set(frame.lookAt[0], frame.lookAt[1], frame.lookAt[2]);
    look.current.lerp(target.current, reducedMotion ? 1 : 0.06);
    camera.lookAt(look.current);
  });

  return null;
}
