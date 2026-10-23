import { layoutPlusCase } from "@/content/cases/layoutplus";
import CaseShell from "./CaseShell";
import Reveal from "@/components/editorial/Reveal";

/** Schematic before/after — real preset names & ranges from README; not fake UI screenshots. */
function WidthSchematic({
  label,
  widthPct,
  note,
}: {
  label: string;
  widthPct: number;
  note: string;
}) {
  return (
    <figure className="border border-border bg-card/50 p-5 sm:p-6">
      <figcaption className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">{label}</span>
        <span className="font-mono text-[10px] text-muted-foreground">{note}</span>
      </figcaption>
      <div className="mt-6 h-36 border border-border/80 bg-background p-3 sm:h-44">
        <div className="flex h-full gap-2">
          <div
            className="flex flex-col justify-between border border-foreground/15 bg-foreground/[0.04] p-2"
            style={{ width: `${widthPct}%` }}
          >
            <div className="space-y-1.5">
              <div className="h-1.5 w-3/4 bg-foreground/20" />
              <div className="h-1.5 w-full bg-foreground/12" />
              <div className="h-1.5 w-5/6 bg-foreground/12" />
            </div>
            <div className="border border-dashed border-foreground/20 p-2">
              <div className="font-mono text-[9px] leading-tight text-muted-foreground">
                code / table
              </div>
              <div className="mt-1.5 space-y-1">
                <div className="h-1 w-full bg-signal/40" />
                <div className="h-1 w-4/5 bg-signal/25" />
                <div className="h-1 w-full bg-signal/25" />
              </div>
            </div>
          </div>
          <div className="min-w-0 flex-1 bg-foreground/[0.03]" aria-hidden />
        </div>
      </div>
    </figure>
  );
}

export default function LayoutPlusCase() {
  const c = layoutPlusCase;

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
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Antes / depois (esquema)
            </p>
            <p className="mb-6 max-w-2xl text-sm text-foreground/60">
              Sem capturas de produto no repositório do portfólio. O diagrama abaixo usa os
              presets e faixas reais do README — não é screenshot do ChatGPT.
            </p>
            <div className="grid gap-4 lg:grid-cols-2">
              <WidthSchematic label="Default" widthPct={42} note="leitura padrão" />
              <WidthSchematic
                label="Wide / Developer"
                widthPct={78}
                note={`${c.range.conversation} conversa`}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Presets
              </p>
              <ul className="space-y-3">
                {c.presets.map((p) => (
                  <li key={p.id} className="border-l border-signal pl-4">
                    <p className="text-sm font-medium">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.hint}</p>
                  </li>
                ))}
              </ul>
              <dl className="mt-8 space-y-2 font-mono text-[11px] text-muted-foreground">
                <div className="flex justify-between gap-4 border-b border-border py-2">
                  <dt>Conversa</dt>
                  <dd className="text-foreground/80">{c.range.conversation}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border py-2">
                  <dt>Compositor</dt>
                  <dd className="text-foreground/80">{c.range.composer}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border py-2">
                  <dt>Fonte</dt>
                  <dd className="text-foreground/80">{c.range.font}</dd>
                </div>
              </dl>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Privacidade (README)
              </p>
              <ul className="space-y-3 text-sm text-foreground/75">
                {c.privacy.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-1.5 h-1 w-1 shrink-0 bg-signal" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mb-4 mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
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
            </div>
          </div>
        </Reveal>
      </div>
    </CaseShell>
  );
}
