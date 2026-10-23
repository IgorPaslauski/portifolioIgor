import { puroSucoCase } from "@/content/cases/purosuco";
import CaseShell from "./CaseShell";
import CodeBlock from "./CodeBlock";
import Reveal from "@/components/editorial/Reveal";

export default function PuroSucoCase() {
  const c = puroSucoCase;

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
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Pipeline
            </p>
            <ol className="grid gap-0 border border-border sm:grid-cols-5">
              {c.pipeline.map((stage, i) => (
                <li
                  key={stage.id}
                  className="border-border p-4 sm:border-r sm:last:border-r-0 max-sm:border-b max-sm:last:border-b-0"
                >
                  <span className="font-mono text-[10px] text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-sm font-medium tracking-tight">{stage.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{stage.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid gap-4 lg:grid-cols-2">
            {c.exhibits.map((ex) => (
              <CodeBlock key={ex.filename} caption={ex.caption} filename={ex.filename} code={ex.code} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Vocabulário (amostra)
              </p>
              <dl className="space-y-0 border border-border">
                {c.vocabSample.map((row) => (
                  <div
                    key={row.csharp}
                    className="grid grid-cols-2 gap-2 border-b border-border px-4 py-3 last:border-b-0"
                  >
                    <dt className="font-mono text-xs text-muted-foreground">{row.csharp}</dt>
                    <dd className="font-mono text-xs text-signal">{row.suco}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Decisões
              </p>
              <ul className="space-y-8">
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

        <Reveal>
          <p className="max-w-xl font-mono text-[11px] leading-relaxed text-muted-foreground">
            CLI:{" "}
            <span className="text-foreground/80">
              dotnet run --project src/PuroSuco.Cli -- traduz examples/hello.suco
            </span>
            {" · "}
            também <span className="text-foreground/80">tokens</span>,{" "}
            <span className="text-foreground/80">ast</span>,{" "}
            <span className="text-foreground/80">check</span>.
          </p>
        </Reveal>
      </div>
    </CaseShell>
  );
}
