import { lazy, Suspense, useEffect, useRef } from "react";
import { profile } from "@/content";
import { assemblyLayers } from "@/content/assembly";
import { Button } from "@/components/ui/button";
import { FallbackBackdrop } from "@/components/canvas/fallback";
import { useSectionProgress } from "@/hooks/use-section-progress";
import { useExperience } from "@/hooks/use-experience";
import { cn, smoothstep } from "@/lib/utils";

const ExperienceCanvas = lazy(() =>
  import("@/components/canvas/experience-canvas").then((module) => ({
    default: module.ExperienceCanvas,
  })),
);

const slides = [
  {
    id: "boot",
    kicker: "Engenheiro de software",
    title: profile.lastName,
    text: `${profile.headline} ${profile.years} anos em sistemas que precisam funcionar na segunda-feira.`,
  },
  {
    id: "sinal",
    kicker: "Sobre",
    title: "Dois ofícios. Uma cabeça.",
    text: `De dia, ERP, contabilidade e APIs do governo. De noite, lexer, AST e uma linguagem que fala em meme. Moro em ${profile.location}, curso ${profile.education}.`,
  },
  {
    id: "sistema",
    kicker: "O sistema",
    title: "Agora ele se monta.",
    text: "Como a Apple mostra um Mac se encaixando: cada camada chega, trava, e o conjunto fica visível. Não é uma lista de skills. É um aparelho.",
  },
  ...assemblyLayers.map((layer) => ({
    id: layer.id,
    kicker: `Camada 0${layer.index + 1}`,
    title: layer.title,
    text: layer.items.join("  ·  "),
  })),
  {
    id: "lock",
    kicker: "Pronto",
    title: "Um stack que se sustenta.",
    text: "Do banco à interface, com critério no meio. O que importa é o que sobrevive à próxima pessoa.",
  },
] as const;

export function Liga({ onProgress }: { onProgress: (value: number) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionProgress(sectionRef);
  const { reducedMotion } = useExperience();

  useEffect(() => {
    onProgress(reducedMotion ? 1 : progress);
  }, [onProgress, progress, reducedMotion]);

  const photoFade = 1 - smoothstep(0.16, 0.4, progress);
  const stageShift = smoothstep(0.2, 0.48, progress);

  return (
    <section ref={sectionRef} id="boot" className="relative">
      <div className="lg:grid lg:grid-cols-2">
        <div className="sticky top-0 z-0 h-[46svh] overflow-hidden bg-ink lg:h-svh">
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
              opacity: reducedMotion ? 0.28 : photoFade * 0.92,
              transform: `scale(${1.04 - stageShift * 0.06})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink/40" />
        </div>

        <div className="relative z-10 bg-ink/0 lg:min-h-0">
          {slides.map((slide, index) => (
            <article
              key={slide.id}
              id={slide.id === "boot" ? undefined : slide.id}
              className={cn(
                "flex flex-col justify-center px-gutter py-16 lg:min-h-svh lg:py-0",
                index === 0 && "min-h-[54svh] lg:min-h-svh",
              )}
            >
              <p className="font-sans text-[12px] uppercase tracking-[0.28em] text-dust">{slide.kicker}</p>
              <h2
                className={cn(
                  "mt-4 max-w-lg text-paper",
                  index === 0 ? "font-display text-display-lg" : "font-display text-display-md",
                )}
              >
                {slide.title}
                {index === 0 && <span className="text-ember">.</span>}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/72">{slide.text}</p>
              {index === 0 && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button onClick={() => document.querySelector("#obras")?.scrollIntoView({ behavior: "smooth" })}>
                    Ver o trabalho
                  </Button>
                  <a href={profile.cv} download="cv-igor-paslauski.pdf">
                    <Button variant="line">CV</Button>
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
