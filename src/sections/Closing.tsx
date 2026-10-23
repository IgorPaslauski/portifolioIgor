import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/content/site";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal";

const CV_HREF = `${import.meta.env.BASE_URL}cv-igor-paslauski.pdf`;

/**
 * Closing — eco visual do hero: tipografia + contato; escultura fecha via poseClosing.
 * Sem formulário longo: mailto é a ação principal.
 */
export default function Closing() {
  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="relative z-10 scroll-mt-24 border-t border-border px-5 pb-16 pt-24 sm:px-8 lg:min-h-[100svh] lg:px-12 lg:pb-20 lg:pt-28"
    >
      <div className="relative z-10 flex max-w-xl flex-col lg:w-[52%] lg:justify-center lg:min-h-[70vh]">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          05 · Contato
        </p>
        <h2 className="mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium tracking-[-0.03em] leading-[0.95]">
          Vamos falar do próximo sistema.
        </h2>
        <p className="mt-6 max-w-[36ch] text-lg leading-relaxed text-muted-foreground">
          Disponível para trabalho remoto. Prefiro começar por e-mail — objetivo e direto.
        </p>

        <a
          href={site.socials.email}
          className={`mt-10 inline-flex items-center gap-3 font-display text-[clamp(1.25rem,2.5vw,1.85rem)] font-medium text-signal underline decoration-signal/35 underline-offset-[6px] motion-safe:transition-colors hover:decoration-signal ${focusRing}`}
        >
          <Mail className="h-5 w-5 shrink-0" aria-hidden />
          igor.paslauski123@gmail.com
        </a>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`border border-foreground/30 px-4 py-2.5 text-sm motion-safe:transition-colors hover:border-signal hover:text-signal ${focusRing}`}
          >
            LinkedIn
          </a>
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`border border-foreground/30 px-4 py-2.5 text-sm motion-safe:transition-colors hover:border-signal hover:text-signal ${focusRing}`}
          >
            GitHub
          </a>
          <a
            href={CV_HREF}
            download="cv-igor-paslauski.pdf"
            className={`bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground motion-safe:transition-transform hover:-translate-y-0.5 ${focusRing}`}
          >
            Currículo (PDF)
          </a>
        </div>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {site.meta.location} · {site.meta.availability}
        </p>

        <div className="mt-8 flex gap-5">
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`text-foreground/70 motion-safe:transition-colors hover:text-signal ${focusRing}`}
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`text-foreground/70 motion-safe:transition-colors hover:text-signal ${focusRing}`}
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>

      <footer className="relative z-10 mt-20 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:mt-28 sm:flex-row sm:items-center sm:justify-between lg:w-[52%]">
        <p className="font-display text-lg font-medium text-foreground">{site.name}</p>
        <p>© {year}</p>
      </footer>
    </section>
  );
}
