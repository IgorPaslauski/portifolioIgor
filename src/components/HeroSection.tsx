import { useRef, type PointerEvent } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import HeroStage from "./hero/HeroStage";
import type { SceneTarget } from "./hero/HeroCanvas";
import { motionTokens } from "@/lib/motion";

const portrait = `${import.meta.env.VITE_API_URL}/perfil.jpg`;
const REST: SceneTarget = { x: 0.12, y: -0.35 };
const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal";

const scrollTo = (id: string) => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
};

const HeroSection = () => {
  const reduce = useReducedMotion();
  const imageRef = useRef<HTMLImageElement>(null);
  const target = useRef<SceneTarget>(REST);
  const invalidateRef = useRef<() => void>(() => {});

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    target.current = {
      x: REST.x + Math.max(-0.16, Math.min(0.16, py * 0.28)),
      y: REST.y + Math.max(-0.2, Math.min(0.2, px * 0.36)),
    };
    invalidateRef.current();
  };

  return (
    <section
      id="home"
      className="relative lg:min-h-[100svh]"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        target.current = REST;
        invalidateRef.current();
      }}
    >
      <div className="relative h-[32vh] sm:h-[36vh] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[48%]">
        <div className="absolute inset-0 max-lg:[mask-image:linear-gradient(180deg,black_62%,transparent)] lg:-left-20 lg:[mask-image:linear-gradient(90deg,transparent,black_24%)]">
          <HeroStage imageRef={imageRef} target={target} invalidateRef={invalidateRef} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col px-5 pb-8 pt-6 sm:px-8 lg:min-h-[100svh] lg:w-[56%] lg:justify-center lg:px-12 lg:py-28">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">Digital engineering studio</p>
        <h1 className="mt-5 text-[clamp(2.7rem,6.2vw,6.5rem)]">
          <span className="block">Ígor</span>
          <m.span
            className="block"
            initial={{ y: reduce ? 0 : 18 }}
            animate={{ y: 0 }}
            transition={{ duration: reduce ? 0 : 0.7, ease: motionTokens.ease }}
          >
            Paslauski
          </m.span>
        </h1>
        <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
          Desenvolvedor full stack em React, Node.js, C# e TypeScript. Sistemas de gestão, interfaces e integrações.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#projects" onClick={(event) => { event.preventDefault(); scrollTo("projects"); }} className={`bg-primary px-5 py-3 text-sm font-medium text-primary-foreground motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 ${focusRing}`}>
            Ver trabalho
          </a>
          <a href="#contact" onClick={(event) => { event.preventDefault(); scrollTo("contact"); }} className={`border border-foreground/30 px-5 py-3 text-sm font-medium motion-safe:transition-colors motion-safe:hover:border-signal motion-safe:hover:text-signal ${focusRing}`}>
            Iniciar conversa
          </a>
          <a
            href={`${import.meta.env.VITE_API_URL}/cv-igor-paslauski.pdf`}
            download="cv-igor-paslauski.pdf"
            className={`px-2 py-3 text-sm underline decoration-signal underline-offset-4 ${focusRing}`}
          >
            Baixar CV
          </a>
        </div>
        <div className="mt-5 flex gap-4">
          <a href="https://github.com/IgorPaslauski" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={`motion-safe:transition-colors motion-safe:hover:text-signal ${focusRing}`}>
            <Github className="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com/in/igor-paslauski-de-oliveira/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`motion-safe:transition-colors motion-safe:hover:text-signal ${focusRing}`}>
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="mailto:igor.paslauski123@gmail.com" aria-label="Email" className={`motion-safe:transition-colors motion-safe:hover:text-signal ${focusRing}`}>
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="relative z-10 mx-5 mb-12 w-[min(100%,16rem)] sm:mx-8 sm:w-72 lg:absolute lg:bottom-12 lg:right-[5%] lg:mx-0 lg:mb-0 lg:w-80">
        <div className="absolute -left-3 -top-3 h-full w-full bg-signal" />
        <img
          ref={imageRef}
          src={portrait}
          alt="Ígor Paslauski Pedroso de Oliveira, desenvolvedor full stack"
          width={640}
          height={800}
          className="relative aspect-[3/4] w-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
