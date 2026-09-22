import { lazy, Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import { profile } from "@/content";
import { assemblyLayers } from "@/content/assembly";
import { Button } from "@/components/ui/button";
import { FallbackBackdrop } from "@/components/canvas/fallback";
import { useInView } from "@/hooks/use-in-view";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { useExperience } from "@/hooks/use-experience";
import { cn, smoothstep } from "@/lib/utils";

const ExperienceCanvas = lazy(() =>
  import("@/components/canvas/experience-canvas").then((module) => ({
    default: module.ExperienceCanvas,
  })),
);

export function Liga({ onProgress }: { onProgress: (value: number) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionProgress(sectionRef);
  const { reducedMotion } = useExperience();

  useEffect(() => {
    onProgress(reducedMotion ? 1 : progress);
  }, [onProgress, progress, reducedMotion]);

  const photoFade = 1 - smoothstep(0.08, 0.34, progress);
  const stageShift = smoothstep(0.14, 0.4, progress);
  const activeLayer = useMemo(() => {
    const open = assemblyLayers.filter((layer) => progress >= layer.enter);
    return open.length ? open[open.length - 1] : assemblyLayers[0];
  }, [progress]);

  return (
    <section ref={sectionRef} id="boot" className="relative">
      <div className="lg:grid lg:grid-cols-2">
        <div className="sticky top-0 z-20 h-[40svh] overflow-hidden bg-ink lg:z-0 lg:h-svh">
          <Suspense fallback={<FallbackBackdrop contained />}>
            <ExperienceCanvas />
          </Suspense>
          <img
            src={profile.photo}
            alt={`${profile.fullName}, ${profile.role}`}
            width={720}
            height={900}
            className="absolute inset-0 h-full w-full object-cover object-[center_20%] grayscale"
            style={{
              opacity: reducedMotion ? 0.2 : photoFade * 0.92,
              transform: `scale(${1.05 - stageShift * 0.07})`,
              filter: `grayscale(1) brightness(${1 + stageShift * 0.12})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/30 lg:bg-gradient-to-r lg:from-transparent lg:via-ink/10 lg:to-ink/55" />
        </div>

        <div className="relative lg:z-10">
          <Slide id="slide-boot" kicker={profile.role} title={profile.lastName} mark reduced={reducedMotion}>
            <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-paper/75">
              {profile.headline} {profile.years} anos em sistemas que precisam funcionar na segunda-feira.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => document.querySelector("#obras")?.scrollIntoView({ behavior: "smooth" })}>
                Ver o trabalho
              </Button>
              <a href={profile.cv} download="cv-igor-paslauski.pdf">
                <Button variant="line">CV</Button>
              </a>
            </div>
          </Slide>

          <Slide
            id="sinal"
            kicker="Sobre"
            title="Dois ofícios. Uma cabeça."
            reduced={reducedMotion}
          >
            <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-paper/75">
              De dia, ERP, contabilidade e APIs do governo. De noite, lexer, AST e uma linguagem que fala em meme.
              Moro em {profile.location}, curso {profile.education}.
            </p>
          </Slide>

          <Slide
            id="sistema"
            kicker="O sistema"
            title="Agora ele se monta."
            reduced={reducedMotion}
            tall
          >
            <p className="mt-5 max-w-md font-body text-lg leading-relaxed text-paper/75">
              Cada camada chega e trava. Não é uma lista de skills. É o aparelho que eu uso para trabalhar.
            </p>
            <ol className="mt-10 max-w-md space-y-5">
              {assemblyLayers.map((layer) => {
                const on = reducedMotion || progress >= layer.enter;
                const current = activeLayer.id === layer.id;
                return (
                  <li
                    key={layer.id}
                    className={cn(
                      "border-l pl-4 transition-colors duration-500",
                      on ? "border-ember text-paper" : "border-paper/10 text-dust",
                    )}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dust">
                      0{layer.index + 1} · {layer.title}
                    </p>
                    <p className={cn("mt-1 text-sm leading-relaxed", current ? "text-paper/80" : "text-paper/55")}>
                      {layer.line}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-dust">{layer.items.join(" · ")}</p>
                  </li>
                );
              })}
            </ol>
            <p className="mt-12 max-w-md font-display text-2xl text-paper">Um stack que se sustenta.</p>
            <p className="mt-3 max-w-md font-body text-paper/70">
              Do banco à interface, com critério no meio. O que importa é o que sobrevive à próxima pessoa.
            </p>
          </Slide>
        </div>
      </div>
    </section>
  );
}

function Slide({
  id,
  kicker,
  title,
  mark,
  tall,
  reduced,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  mark?: boolean;
  tall?: boolean;
  reduced: boolean;
  children: ReactNode;
}) {
  const { ref, visible } = useInView(0.28);

  return (
    <article
      ref={ref}
      id={id}
      className={cn(
        "flex flex-col justify-center px-gutter py-16 lg:py-0",
        tall ? "lg:min-h-[150svh]" : "lg:min-h-svh",
        id === "slide-boot" && "min-h-[60svh] lg:min-h-svh",
        !reduced && "transition-all duration-700 ease-editorial",
        visible || reduced ? "translate-y-0 opacity-100" : "translate-y-8 opacity-25",
      )}
    >
      <p className="text-[12px] uppercase tracking-[0.28em] text-dust">{kicker}</p>
      <h2 className={cn("mt-4 max-w-lg text-paper", mark ? "font-display text-display-lg" : "font-display text-display-md")}>
        {title}
        {mark && <span className="text-ember">.</span>}
      </h2>
      {children}
    </article>
  );
}
