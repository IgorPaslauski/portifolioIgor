import { createContext } from "react";
import type { ChapterId } from "@/content";
import type { PerformanceTier } from "@/lib/performance";

export type ExperienceContextValue = {
  progress: number;
  ligaProgress: number;
  chapter: ChapterId;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  webgl: boolean;
  tier: PerformanceTier;
  hoveredCase: string | null;
  setHoveredCase: (slug: string | null) => void;
};

export const ExperienceContext = createContext<ExperienceContextValue | null>(null);
