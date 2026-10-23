import type { PointerEvent } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import MonogramStage from "@/sculpture/MonogramStage";
import { useSculpture } from "@/sculpture/SculptureContext";
import { site } from "@/content/site";
import { motionTokens } from "@/lib/motion";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal";

const scrollTo = (id: string) => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
};

export default function Hero() {
  const reduce = useReducedMotion();
  const { pointer, invalidateRef, reducedMotion, progress } = useSculpture();

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    pointer.current = {
      x: Math.max(-0.1, Math.min(0.1, py * 0.22)),
      y: Math.max(-0.14, Math.min(0.14, px * 0.28)),
    };
    invalidateRef.current();
  };

  // Mid-page: shrink + fade. Closing (~0.82+): restore presence for seal echo.
  let stageWidth = 50;
  let stageRight = 0;
  let stageOpacity = 1;
  if (progress > 0.28 && progress < 0.82) {
    const mid = Math.min(1, (progress - 0.28) / 0.5);
    stageWidth = 50 - mid * 20;
    stageRight = mid * 6;
    stageOpacity = Math.max(0.1, 1 - mid * 0.9);
  } else if (progress >= 0.82) {
    const close = Math.min(1, (progress - 0.82) / 0.18);
    stageWidth = 30 + close * 20;
    stageRight = 6 - close * 6;
    stageOpacity = 0.1 + close * 0.9;
  }

  return (
    <section
      id="home"
      className="relative lg:min-h-[100svh]"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
        invalidateRef.current();
      }}
    >
      {/* Desktop: fixed plane shrinks toward the right as Work pose settles */}
      <div
        className="pointer-events-none relative z-0 h-[36vh] w-full sm:h-[40vh] lg:fixed lg:inset-y-0 lg:right-0 lg:h-auto max-lg:!w-full"
        style={{
          width: `${stageWidth}%`,
          opacity: Math.max(0.08, Math.min(1, stageOpacity)),
          transform: Math.abs(stageRight) > 0.01 ? `translate3d(${stageRight}%,0,0)` : undefined,
        }}
      >
        <div className="absolute inset-0 max-lg:[mask-image:linear-gradient(180deg,black_72%,transparent)] lg:[mask-image:linear-gradient(90deg,transparent,black_10%)]">
          <MonogramStage />
        </div>
      </div>

      <div className="relative z-10 flex flex-col px-5 pb-16 pt-20 sm:px-8 lg:min-h-[100svh] lg:w-[54%] lg:justify-center lg:px-12 lg:py-28">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          {site.indexLabel} · Immersive Engineering
        </p>
        <h1 className="mt-5 max-w-[11ch] text-[clamp(2.5rem,5.4vw,4.75rem)] font-medium tracking-[-0.03em] leading-[0.92]">
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
        <p className="mt-6 max-w-[36ch] text-lg leading-relaxed text-muted-foreground">
          {site.positioning}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={site.cta.work.href}
            onClick={(event) => {
              event.preventDefault();
              scrollTo("work");
            }}
            className={`bg-primary px-5 py-3 text-sm font-medium text-primary-foreground motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 ${focusRing}`}
          >
            {site.cta.work.label}
          </a>
          <a
            href={site.cta.contact.href}
            onClick={(event) => {
              event.preventDefault();
              scrollTo("contact");
            }}
            className={`border border-foreground/30 px-5 py-3 text-sm font-medium motion-safe:transition-colors motion-safe:hover:border-signal motion-safe:hover:text-signal ${focusRing}`}
          >
            {site.cta.contact.label}
          </a>
        </div>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {site.meta.location} · {site.meta.availability}
          <span className="mt-2 block normal-case tracking-normal text-muted-foreground/80">
            {site.meta.stack}
          </span>
        </p>
        <div className="mt-6 flex gap-4">
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`motion-safe:transition-colors motion-safe:hover:text-signal ${focusRing}`}
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`motion-safe:transition-colors motion-safe:hover:text-signal ${focusRing}`}
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={site.socials.email}
            aria-label="Email"
            className={`motion-safe:transition-colors motion-safe:hover:text-signal ${focusRing}`}
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
