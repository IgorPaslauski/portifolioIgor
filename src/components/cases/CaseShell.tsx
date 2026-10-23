import type { ReactNode } from "react";
import type { CaseBase } from "@/content/cases/types";
import Reveal from "@/components/editorial/Reveal";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal";

type CaseShellProps = {
  meta: CaseBase;
  children: ReactNode;
  className?: string;
};

export default function CaseShell({ meta, children, className = "" }: CaseShellProps) {
  return (
    <article
      id={meta.id}
      className={`relative scroll-mt-28 border-t border-border py-20 sm:py-24 lg:py-28 ${className}`}
    >
      <Reveal>
        <header className="mb-12 max-w-3xl lg:mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
            Case {meta.index} · {meta.status === "reserved" ? "Reservado" : "Selected"}
          </p>
          <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.75rem)] font-medium tracking-[-0.02em] leading-[1.05]">
            {meta.title}
          </h3>
          <p className="mt-4 max-w-xl text-lg text-foreground/70">{meta.subtitle}</p>
          {meta.stack.length > 0 && (
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {meta.stack.join(" · ")}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            {meta.repo && (
              <a
                href={meta.repo.href}
                target={meta.repo.external ? "_blank" : undefined}
                rel={meta.repo.external ? "noopener noreferrer" : undefined}
                className={`border border-foreground/30 px-4 py-2 text-sm motion-safe:transition-colors hover:border-signal hover:text-signal ${focusRing}`}
              >
                {meta.repo.label}
              </a>
            )}
            {meta.live && (
              <a
                href={meta.live.href}
                target={meta.live.external ? "_blank" : undefined}
                rel={meta.live.external ? "noopener noreferrer" : undefined}
                className={`bg-primary px-4 py-2 text-sm font-medium text-primary-foreground motion-safe:transition-transform hover:-translate-y-0.5 ${focusRing}`}
              >
                {meta.live.label}
              </a>
            )}
          </div>
        </header>
      </Reveal>
      {children}
    </article>
  );
}
