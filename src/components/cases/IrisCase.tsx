import { irisCase } from "@/content/cases/iris";
import CaseShell from "./CaseShell";
import Reveal from "@/components/editorial/Reveal";

export default function IrisCase() {
  return (
    <CaseShell meta={irisCase}>
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex min-h-[16rem] flex-col justify-between border border-border bg-card/40 p-8 lg:col-span-8 lg:min-h-[20rem] lg:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
              Slot estrutural
            </p>
            <p className="max-w-lg text-lg leading-relaxed text-foreground/75">{irisCase.notice}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Aguardando material autorizado
            </p>
          </div>
          <div className="lg:col-span-3 lg:col-start-10 lg:self-end">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Tema
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">
              Inteligência e transparência em contratações públicas — enunciado apenas; sem
              claims até o brief.
            </p>
          </div>
        </div>
      </Reveal>
    </CaseShell>
  );
}
