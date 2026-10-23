import { fireSimCase } from "@/content/cases/firesim";
import CaseShell from "./CaseShell";
import Reveal from "@/components/editorial/Reveal";

/** Abstract grid viz — illustrates documented domains, not a captured frame or benchmark. */
function ForestGridSchematic() {
  const cells = Array.from({ length: 96 }, (_, i) => {
    const r = (i * 17) % 10;
    if (r < 5) return "tree";
    if (r < 7) return "fire";
    if (r < 8) return "ash";
    return "empty";
  });

  return (
    <figure className="border border-border bg-card/40 p-5 sm:p-6">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
          Domínio da grade
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          Esquema ilustrativo — não é frame capturado
        </span>
      </figcaption>
      <div
        className="mt-5 grid aspect-[4/3] w-full gap-px bg-border"
        style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}
        aria-hidden
      >
        {cells.map((kind, i) => (
          <div
            key={i}
            className={
              kind === "tree"
                ? "bg-foreground/25"
                : kind === "fire"
                  ? "bg-signal/70"
                  : kind === "ash"
                    ? "bg-foreground/10"
                    : "bg-background"
            }
          />
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        <li className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 bg-foreground/25" /> Árvore
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 bg-signal/70" /> Fogo
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 bg-foreground/10" /> Cinza
        </li>
      </ul>
    </figure>
  );
}

export default function FireSimCase() {
  const c = fireSimCase;

  return (
    <CaseShell meta={c}>
      <div className="space-y-16 lg:space-y-20">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Problema
              </p>
              <p className="mt-3 text-base leading-relaxed text-foreground/85 lg:text-lg">{c.problem}</p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Contexto
              </p>
              <p className="mt-3 text-base leading-relaxed text-foreground/70">{c.context}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <ForestGridSchematic />
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Binários (README)
              </p>
              <ul className="space-y-5">
                {c.binaries.map((b) => (
                  <li key={b.id}>
                    <p className="font-mono text-sm text-signal">{b.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/70">{b.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Controles ncurses
              </p>
              <dl className="border border-border">
                {c.controls.map((row) => (
                  <div
                    key={row.key}
                    className="grid grid-cols-[4.5rem_1fr] gap-3 border-b border-border px-4 py-3 last:border-b-0"
                  >
                    <dt className="font-mono text-xs text-signal">{row.key}</dt>
                    <dd className="text-sm text-foreground/80">{row.action}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Painel: {c.stats.join(" · ")}
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Decisões
              </p>
              <ul className="space-y-6">
                {c.decisions.map((d) => (
                  <li key={d.title}>
                    <p className="text-base font-medium tracking-tight">{d.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{d.body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
                Sem números de benchmark neste case — o README descreve o fluxo e a
                instrumentação, não resultados de desempenho publicados no portfólio.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </CaseShell>
  );
}
