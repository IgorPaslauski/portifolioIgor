import { clamp, inverseLerp, lerp } from "./utils";

export type CameraKeyframe = {
  at: number;
  position: [number, number, number];
  lookAt: [number, number, number];
  intensity: number;
};

export const cameraPath: CameraKeyframe[] = [
  { at: 0, position: [0.15, 0.25, 4.35], lookAt: [0, 0.05, 0], intensity: 1.05 },
  { at: 0.16, position: [1.35, 0.55, 5.4], lookAt: [0.1, 0.05, 0], intensity: 1 },
  { at: 0.34, position: [-2.15, 1.15, 6.8], lookAt: [0.35, 0, 0], intensity: 0.92 },
  { at: 0.5, position: [0.55, 2.05, 8.1], lookAt: [0, 0.1, 0], intensity: 0.88 },
  { at: 0.68, position: [2.85, 0.35, 5.9], lookAt: [0.7, 0.05, 0], intensity: 1.12 },
  { at: 0.84, position: [-1.8, 1.15, 7.2], lookAt: [0, 0.2, 0], intensity: 0.42 },
  { at: 1, position: [2.4, 1.4, 8.4], lookAt: [-0.4, 0.1, 0], intensity: 0.28 },
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
