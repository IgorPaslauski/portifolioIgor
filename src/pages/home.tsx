import { lazy, Suspense, useState } from "react";
import { Channel } from "@/components/sections/channel";
import { Notes } from "@/components/sections/notes";
import { Opening } from "@/components/sections/opening";
import { Signal } from "@/components/sections/signal";
import { System } from "@/components/sections/system";
import { Trace } from "@/components/sections/trace";
import { Works } from "@/components/sections/works";
import { SiteChrome } from "@/components/layout/site-chrome";
import { FallbackBackdrop } from "@/components/canvas/fallback";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { ExperienceProvider } from "@/state/experience-context";

const ExperienceCanvas = lazy(() =>
  import("@/components/canvas/experience-canvas").then((module) => ({
    default: module.ExperienceCanvas,
  })),
);

export function HomePage() {
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  useHashScroll();

  return (
    <ExperienceProvider hoveredCase={hoveredCase} setHoveredCase={setHoveredCase}>
      <Suspense fallback={<FallbackBackdrop />}>
        <ExperienceCanvas />
      </Suspense>
      <SiteChrome>
        <main>
          <Opening />
          <Signal />
          <Trace />
          <System />
          <Works />
          <Notes />
          <Channel />
        </main>
      </SiteChrome>
    </ExperienceProvider>
  );
}
