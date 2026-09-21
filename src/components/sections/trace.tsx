import { experiences } from "@/content";

export function Trace() {
  return (
    <section id="traco" className="relative z-10 px-gutter py-28 md:py-36">
      <div className="mx-auto max-w-page">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">02 · Traço</p>
          <h2 className="mt-4 font-display text-display-md text-paper">O caminho não é um currículo. É um log.</h2>
          <p className="mt-5 max-w-xl font-body text-lg text-paper/75">
            Duas empresas. Sistemas que já existiam antes de mim e vão existir depois. O que
            interessa é o que ficou mais rápido, mais claro, mais possível.
          </p>
        </div>

        <ol className="mt-16 space-y-0">
          {experiences.map((job, index) => (
            <li
              key={job.id}
              className="grid gap-8 border-t border-paper/10 py-12 lg:grid-cols-12"
            >
              <div className="lg:col-span-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-dust">
                  {String(index + 1).padStart(2, "0")} · {job.period}
                </p>
                <h3 className="mt-3 font-display text-3xl text-paper">{job.company}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-ember">{job.role}</p>
              </div>
              <div className="lg:col-span-8">
                <p className="font-body text-lg text-paper/80">{job.summary}</p>
                <ul className="mt-6 space-y-3">
                  {job.marks.map((mark) => (
                    <li key={mark} className="flex gap-3 text-paper/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-ember" aria-hidden />
                      <span>{mark}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-dust">
                  {job.technologies.join(" · ")}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
