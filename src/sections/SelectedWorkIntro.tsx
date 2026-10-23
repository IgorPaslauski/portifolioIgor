/**
 * Marco 2 — static first strip of Selected Work.
 * Sculpture recedes via poseWork; case content is structural (Íris slot empty of invented copy).
 * Full cases land in a later phase; existing ProjectsSection remains below.
 */
export default function SelectedWorkIntro() {
  return (
    <section id="work" className="relative z-10 scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mb-16 max-w-2xl">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
          02 · Selected Work
        </p>
        <h2 className="text-[clamp(2rem,3.5vw,3.25rem)] font-medium tracking-[-0.02em] leading-[1.05]">
          Casos com estrutura, não vitrine de cards.
        </h2>
        <p className="mt-5 max-w-md text-foreground/70">
          A escultura recua; o protagonismo passa para o problema, o contexto e as decisões.
        </p>
      </div>

      <article className="grid gap-10 border-t border-border pt-12 lg:grid-cols-12 lg:gap-12">
        <div className="flex min-h-[18rem] flex-col justify-between bg-card p-8 lg:col-span-7 lg:min-h-[22rem]">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            Case 01 · slot estrutural
          </p>
          <div>
            <h3 className="text-[clamp(1.5rem,2.2vw,2.25rem)] font-medium tracking-tight">
              Íris Pública
            </h3>
            <p className="mt-4 max-w-md text-muted-foreground">
              Conteúdo em preparação. O case será escrito apenas com material fornecido —
              problema, contexto, decisões e resultado. Nada inventado.
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Aguardando brief
          </p>
        </div>
        <div className="flex flex-col justify-end gap-6 lg:col-span-4 lg:col-start-8 lg:max-w-xs">
          <div className="border-l border-signal pl-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Em seguida
            </p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/85">
              <li>PuroSuco</li>
              <li>Layout+</li>
              <li>Fire Sim</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            O arquivo completo de projetos permanece abaixo nesta fase, até a substituição do Lab.
          </p>
        </div>
      </article>
    </section>
  );
}
