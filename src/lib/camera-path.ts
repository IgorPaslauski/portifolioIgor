import { clamp, inverseLerp, lerp } from "./utils";

export type CameraKeyframe = {
  at: number;
  position: [number, number, number];
  lookAt: [number, number, number];
  intensity: number;
};

export const cameraPath: CameraKeyframe[] = [
  { at: 0, position: [0.15, 0.05, 3.2], lookAt: [0, -0.15, 0], intensity: 0.9 },
  { at: 0.2, position: [0.4, 0.2, 3.8], lookAt: [0, -0.2, 0], intensity: 1 },
  { at: 0.34, position: [2.6, 1.15, 5.6], lookAt: [0, -0.25, 0], intensity: 1.08 },
  { at: 0.62, position: [3.1, 0.55, 5.2], lookAt: [0, -0.2, 0], intensity: 1.15 },
  { at: 0.86, position: [1.7, 0.85, 4.6], lookAt: [0, -0.18, 0], intensity: 1.12 },
  { at: 1, position: [0.85, 0.45, 4.1], lookAt: [0, -0.15, 0], intensity: 1.08 },
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
