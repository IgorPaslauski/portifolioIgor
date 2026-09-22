import { useMemo, type ReactNode } from "react";
import { useActiveChapter } from "@/hooks/use-active-chapter";
import { useLenis } from "@/hooks/use-lenis";
import { usePerformanceTier } from "@/hooks/use-performance-tier";
import { usePointerBridge } from "@/hooks/use-pointer";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useWebGL } from "@/hooks/use-webgl";
import { ExperienceContext } from "./experience-store";

export function ExperienceProvider({
  children,
  hoveredCase,
  setHoveredCase,
  ligaProgress,
}: {
  children: ReactNode;
  hoveredCase: string | null;
  setHoveredCase: (slug: string | null) => void;
  ligaProgress: number;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const progress = useScrollProgress();
  const chapter = useActiveChapter();
  const webgl = useWebGL();
  const tier = usePerformanceTier();

  usePointerBridge();
  useLenis(!reducedMotion);

  const value = useMemo(
    () => ({
      progress,
      ligaProgress,
      chapter,
      reducedMotion,
      webgl,
      tier,
      hoveredCase,
      setHoveredCase,
    }),
    [progress, ligaProgress, chapter, reducedMotion, webgl, tier, hoveredCase, setHoveredCase],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}
