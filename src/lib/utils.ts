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
