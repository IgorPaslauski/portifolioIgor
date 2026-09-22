import { clamp, inverseLerp, lerp } from "./utils";

export type CameraKeyframe = {
  at: number;
  position: [number, number, number];
  lookAt: [number, number, number];
  intensity: number;
};

export const cameraPath: CameraKeyframe[] = [
  { at: 0, position: [0.2, 0.08, 3.1], lookAt: [0, 0.05, 0], intensity: 0.88 },
  { at: 0.22, position: [0.55, 0.22, 3.5], lookAt: [0, 0, 0], intensity: 1 },
  { at: 0.42, position: [1.9, 0.85, 4.4], lookAt: [0, 0, 0], intensity: 1.08 },
  { at: 0.68, position: [2.15, 0.35, 4.2], lookAt: [0, -0.05, 0], intensity: 1.14 },
  { at: 1, position: [1.15, 0.42, 3.55], lookAt: [0, 0.02, 0], intensity: 1.1 },
];

export function sampleCamera(progress: number) {
  const t = clamp(progress);
  let nextIndex = cameraPath.findIndex((frame) => frame.at >= t);
  if (nextIndex === -1) nextIndex = cameraPath.length - 1;
  const prevIndex = Math.max(0, nextIndex - 1);
  const prev = cameraPath[prevIndex];
  const next = cameraPath[nextIndex];
  const local = inverseLerp(prev.at, next.at, t);

  return {
    position: [
      lerp(prev.position[0], next.position[0], local),
      lerp(prev.position[1], next.position[1], local),
      lerp(prev.position[2], next.position[2], local),
    ] as [number, number, number],
    lookAt: [
      lerp(prev.lookAt[0], next.lookAt[0], local),
      lerp(prev.lookAt[1], next.lookAt[1], local),
      lerp(prev.lookAt[2], next.lookAt[2], local),
    ] as [number, number, number],
    intensity: lerp(prev.intensity, next.intensity, local),
  };
}
