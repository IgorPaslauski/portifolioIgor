import { useMemo, type ReactNode } from "react";
import { useActiveChapter } from "@/hooks/use-active-chapter";
import { useLenis } from "@/hooks/use-lenis";
import { usePerformanceTier } from "@/hooks/use-performance-tier";
import { usePointer } from "@/hooks/use-pointer";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useWebGL } from "@/hooks/use-webgl";
import { ExperienceContext } from "./experience-store";

export function ExperienceProvider({
  children,
  hoveredCase,
  setHoveredCase,
}: {
  children: ReactNode;
  hoveredCase: string | null;
  setHoveredCase: (slug: string | null) => void;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const progress = useScrollProgress();
  const chapter = useActiveChapter();
  const pointer = usePointer();
  const webgl = useWebGL();
  const tier = usePerformanceTier();

  useLenis(!reducedMotion);

  const value = useMemo(
    () => ({
      progress,
      chapter,
      pointer,
      reducedMotion,
      webgl,
      tier,
      hoveredCase,
      setHoveredCase,
    }),
    [progress, chapter, pointer, reducedMotion, webgl, tier, hoveredCase, setHoveredCase],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}
