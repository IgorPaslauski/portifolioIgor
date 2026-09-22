import { useState } from "react";
import { Channel } from "@/components/sections/channel";
import { Liga } from "@/components/sections/liga";
import { Notes } from "@/components/sections/notes";
import { Principles } from "@/components/sections/principles";
import { Trace } from "@/components/sections/trace";
import { Works } from "@/components/sections/works";
import { LabFrame } from "@/components/layout/lab-frame";
import { SiteChrome } from "@/components/layout/site-chrome";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { ExperienceProvider } from "@/state/experience-context";

export function HomePage() {
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const [ligaProgress, setLigaProgress] = useState(0);
  useHashScroll();

  return (
    <ExperienceProvider
      hoveredCase={hoveredCase}
      setHoveredCase={setHoveredCase}
      ligaProgress={ligaProgress}
    >
      <LabFrame />
      <SiteChrome>
        <main className="relative z-10">
          <Liga onProgress={setLigaProgress} />
          <Trace />
          <Principles />
          <Works />
          <Notes />
          <Channel />
        </main>
      </SiteChrome>
    </ExperienceProvider>
  );
}
