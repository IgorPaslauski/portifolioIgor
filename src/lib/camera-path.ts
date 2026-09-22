import { clamp, inverseLerp, lerp } from "./utils";

export type CameraKeyframe = {
  at: number;
  position: [number, number, number];
  lookAt: [number, number, number];
  intensity: number;
};

export const cameraPath: CameraKeyframe[] = [
  { at: 0, position: [0.2, 0.15, 3.6], lookAt: [0, 0.05, 0], intensity: 0.95 },
  { at: 0.22, position: [0.35, 0.2, 4.1], lookAt: [0, 0.08, 0], intensity: 1 },
  { at: 0.38, position: [1.8, 0.9, 6.4], lookAt: [0, 0.15, 0], intensity: 1.05 },
  { at: 0.72, position: [2.4, 0.55, 6.8], lookAt: [0, 0.1, 0], intensity: 1.1 },
  { at: 1, position: [0.1, 0.35, 5.6], lookAt: [0, 0.15, 0], intensity: 1.05 },
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
