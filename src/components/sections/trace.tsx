import { experiences } from "@/content";

export function Trace() {
  return (
    <section id="traco" className="relative z-10 bg-ink px-gutter py-28 md:py-36">
      <div className="mx-auto max-w-page">
        <p className="text-[12px] uppercase tracking-[0.28em] text-dust">Trajeto</p>
        <h2 className="mt-4 max-w-xl font-display text-display-md text-paper">
          O que ficou mais rápido, mais claro, mais possível.
        </h2>

        <ol className="mt-20 space-y-20">
          {experiences.map((job) => (
            <li key={job.id} className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="text-[12px] uppercase tracking-[0.2em] text-dust">{job.period}</p>
                <h3 className="mt-3 font-display text-3xl text-paper">{job.company}</h3>
                <p className="mt-2 text-sm text-paper/55">{job.role}</p>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <p className="text-lg leading-relaxed text-paper/75">{job.summary}</p>
                <ul className="mt-6 space-y-3 text-paper/70">
                  {job.marks.map((mark) => (
                    <li key={mark}>{mark}</li>
                  ))}
                </ul>
                <p className="mt-6 text-[13px] text-dust">{job.technologies.join(" · ")}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
