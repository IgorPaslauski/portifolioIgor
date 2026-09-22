import { lazy, Suspense, useEffect, useRef } from "react";
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
    text: "Cada camada chega, gira e trava. Não é uma lista de skills. É o aparelho que eu uso para trabalhar.",
  },
  ...assemblyLayers.map((layer) => ({
    id: layer.id,
    kicker: `Camada 0${layer.index + 1}`,
    title: layer.title,
    text: `${layer.line} ${layer.items.join(" · ")}`,
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

  const photoFade = 1 - smoothstep(0.1, 0.32, progress);
  const stageShift = smoothstep(0.16, 0.42, progress);
  const activeIndex = Math.min(
    slides.length - 1,
    Math.max(0, Math.round(progress * (slides.length - 1))),
  );

  const goTo = (index: number) => {
    const id = slides[index].id === "boot" ? "slide-boot" : slides[index].id;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
              opacity: reducedMotion ? 0.22 : photoFade * 0.92,
              transform: `scale(${1.06 - stageShift * 0.08})`,
              filter: `grayscale(1) brightness(${1 + stageShift * 0.15})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-ink/35 lg:bg-gradient-to-r lg:from-transparent lg:via-ink/10 lg:to-ink/50" />

          <div className="absolute bottom-5 left-5 z-10 hidden items-center gap-2 lg:flex" aria-hidden>
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  index === activeIndex ? "w-7 bg-ember" : "w-2 bg-paper/25 hover:bg-paper/50",
                )}
                aria-label={slide.title}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10">
          {slides.map((slide, index) => (
            <Slide key={slide.id} slide={slide} index={index} reduced={reducedMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Slide({
  slide,
  index,
  reduced,
}: {
  slide: (typeof slides)[number];
  index: number;
  reduced: boolean;
}) {
  const { ref, visible } = useInView(0.35);

  return (
    <article
      ref={ref}
      id={slide.id === "boot" ? "slide-boot" : slide.id}
      className={cn(
        "flex flex-col justify-center px-gutter py-16 lg:min-h-svh lg:py-0",
        index === 0 && "min-h-[54svh] lg:min-h-svh",
        !reduced && "transition-all duration-700 ease-editorial",
        visible || reduced ? "translate-y-0 opacity-100" : "translate-y-8 opacity-25",
      )}
    >
      <p className="text-[12px] uppercase tracking-[0.28em] text-dust">{slide.kicker}</p>
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
  );
}
