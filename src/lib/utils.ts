import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

export function inverseLerp(from: number, to: number, value: number) {
  if (from === to) return 0;
  return clamp((value - from) / (to - from));
}

export function smoothstep(from: number, to: number, value: number) {
  const t = inverseLerp(from, to, value);
  return t * t * (3 - 2 * t);
}

export function snapEase(t: number) {
  const x = clamp(t);
  const overshoot = 1.70158;
  return 1 + (overshoot + 1) * (x - 1) ** 3 + overshoot * (x - 1) ** 2;
}
