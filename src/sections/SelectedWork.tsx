import IrisCase from "@/components/cases/IrisCase";
import PuroSucoCase from "@/components/cases/PuroSucoCase";
import LayoutPlusCase from "@/components/cases/LayoutPlusCase";
import FireSimCase from "@/components/cases/FireSimCase";
import Reveal from "@/components/editorial/Reveal";

/**
 * Fase 2 — Selected Work editorial.
 * Sculpture stays in poseWork (receded). ProjectsSection archive remains until Lab ships.
 */
export default function SelectedWork() {
  return (
    <section id="work" className="relative z-10 scroll-mt-24 px-5 sm:px-8 lg:px-12">
      <div className="pb-8 pt-24 lg:pb-12 lg:pt-32">
        <Reveal>
          <div className="max-w-2xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
              02 · Selected Work
            </p>
            <h2 className="text-[clamp(2rem,3.5vw,3.25rem)] font-medium tracking-[-0.02em] leading-[1.05]">
              Casos com estrutura, não vitrine de cards.
            </h2>
            <p className="mt-5 max-w-md text-foreground/70">
              A escultura recua; o protagonismo passa para o problema, o contexto e as
              decisões. Cada case usa só material verificável.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="pb-16 lg:pb-24">
        <IrisCase />
        <PuroSucoCase />
        <LayoutPlusCase />
        <FireSimCase />
      </div>
    </section>
  );
}
