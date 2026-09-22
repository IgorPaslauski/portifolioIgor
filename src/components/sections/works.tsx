import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ContractDiagram, MetricBoard, PuroSucoLab, ShotFrame, VersionShift } from "@/components/cases/visuals";
import { SectionHandoff } from "@/components/layout/lab-frame";
import { getProject } from "@/content";
import { useExperience } from "@/hooks/use-experience";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

export function Works() {
  const purosuco = getProject("purosuco")!;
  const estoque = getProject("estoque")!;
  const pad = getProject("pad")!;
  const reinf = getProject("reinf")!;
  const angular = getProject("angular-15")!;
  const folgen = getProject("folgen-group")!;
  const eduarda = getProject("eduarda")!;

  return (
    <section id="obras" className="relative z-10 bg-ink">
      <SectionHandoff from="Como penso" to="Trabalho" note="O número vira case. O case vira laboratório." />

      <div className="px-gutter pb-28 pt-10 md:pb-36">
        <div className="mx-auto max-w-page">
          <p className="text-[12px] uppercase tracking-[0.28em] text-dust">Trabalho</p>
          <h2 className="mt-4 max-w-2xl font-display text-display-md text-paper">
            Cases. Poucos, e com o corte aberto.
          </h2>

          <PuroSucoFeature />

          <div className="mt-20 grid gap-16 border-t border-paper/10 pt-16 lg:grid-cols-2">
            <CaseLink slug={estoque.slug} kicker={estoque.kicker} title={estoque.title} year={estoque.year}>
              <MetricBoard from="2h" to="3min" caption={estoque.summary} />
            </CaseLink>
            <CaseLink slug={pad.slug} kicker={pad.kicker} title={pad.title} year={pad.year}>
              <MetricBoard from="espera" to="2min" caption={pad.summary} />
            </CaseLink>
          </div>

          <div className="mt-20 grid gap-16 border-t border-paper/10 pt-16 lg:grid-cols-2">
            <CaseLink slug={reinf.slug} kicker={reinf.kicker} title={reinf.title} year={reinf.year}>
              <p className="mb-6 max-w-md font-body text-paper/70">{reinf.summary}</p>
              <ContractDiagram />
            </CaseLink>
            <CaseLink slug={angular.slug} kicker={angular.kicker} title={angular.title} year={angular.year}>
              <VersionShift />
              <p className="mt-6 max-w-md font-body text-paper/70">{angular.summary}</p>
            </CaseLink>
          </div>

          <div className="mt-20 grid gap-12 border-t border-paper/10 pt-16 lg:grid-cols-2">
            <CaseLink slug={folgen.slug} kicker={folgen.kicker} title={folgen.title} year={folgen.year}>
              <ShotFrame project={folgen} />
              <p className="mt-4 font-body text-paper/65">{folgen.summary}</p>
            </CaseLink>
            <CaseLink slug={eduarda.slug} kicker={eduarda.kicker} title={eduarda.title} year={eduarda.year}>
              <ShotFrame project={eduarda} />
              <p className="mt-4 font-body text-paper/65">{eduarda.summary}</p>
            </CaseLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function PuroSucoFeature() {
  const { setHoveredCase } = useExperience();
  const { ref, visible } = useInView(0.18);

  return (
    <article
      ref={ref}
      className={cn(
        "mt-16 border-t border-ember/40 pt-12 transition-all duration-700 ease-editorial",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-40",
      )}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
        01 · Linguagem + compilador · 2026 · Aberto
      </p>
      <div className="mt-4 grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h3 className="font-display text-display-md text-paper">PuroSuco</h3>
          <p className="mt-4 font-body text-lg leading-relaxed text-paper/75">
            Uma linguagem experimental baseada em memes brasileiros — com lexer, parser, AST, diagnósticos,
            formatter, runner e Language Server.
          </p>
          <p className="mt-4 font-mono text-[12px] text-dust">C# · .NET 8 · LSP · Tree-sitter · VS Code</p>
          <Link
            to="/obra/purosuco"
            className="mt-8 inline-flex text-sm text-ember"
            onMouseEnter={() => setHoveredCase("purosuco")}
            onMouseLeave={() => setHoveredCase(null)}
          >
            Abrir o laboratório →
          </Link>
        </div>
        <div className="lg:col-span-7">
          <PuroSucoLab />
        </div>
      </div>
    </article>
  );
}

function CaseLink({
  slug,
  kicker,
  title,
  year,
  children,
}: {
  slug: string;
  kicker: string;
  title: string;
  year: string;
  children: ReactNode;
}) {
  const { setHoveredCase, hoveredCase } = useExperience();
  const { ref, visible } = useInView(0.18);

  return (
    <article
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-editorial",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-40",
        hoveredCase === slug && "opacity-100",
      )}
    >
      <Link
        to={`/obra/${slug}`}
        className="block"
        onMouseEnter={() => setHoveredCase(slug)}
        onMouseLeave={() => setHoveredCase(null)}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dust">
          {kicker} · {year}
        </p>
        <h3 className="mt-2 font-display text-3xl text-paper transition-colors hover:text-ember md:text-4xl">
          {title}
        </h3>
        <div className="mt-6">{children}</div>
        <p className="mt-5 text-sm text-ember">Abrir o case →</p>
      </Link>
    </article>
  );
}
