import Reveal from "@/components/editorial/Reveal";
import {
  engineeringAside,
  engineeringIntro,
  jobChapters,
  practiceAreas,
} from "@/content/engineering";

export default function Engineering() {
  return (
    <section
      id="engineering"
      className="relative z-10 scroll-mt-24 border-t border-border px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <Reveal>
        <div className="mb-16 max-w-3xl lg:mb-24">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
            {engineeringIntro.index} · Engineering
          </p>
          <h2 className="text-[clamp(2rem,3.5vw,3.25rem)] font-medium tracking-[-0.02em] leading-[1.05]">
            {engineeringIntro.headline}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
            {engineeringIntro.lead}
          </p>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {engineeringAside.years} · {engineeringAside.formation}
          </p>
        </div>
      </Reveal>

      <div className="space-y-24 lg:space-y-32">
        {jobChapters.map((job, index) => {
          const flip = index % 2 === 1;
          return (
            <Reveal key={job.id} delay={index * 0.04}>
              <article
                className={`grid gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-14 ${
                  flip ? "" : ""
                }`}
              >
                <div className={flip ? "lg:col-span-4 lg:col-start-9 lg:text-right" : "lg:col-span-4"}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
                    {job.period}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">{job.role}</p>
                </div>

                <div className={flip ? "lg:col-span-7 lg:col-start-1 lg:row-start-1" : "lg:col-span-7 lg:col-start-6"}>
                  <h3 className="text-[clamp(1.75rem,2.8vw,2.75rem)] font-medium tracking-[-0.02em] leading-[1.05]">
                    {job.company}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/75">
                    {job.context}
                  </p>

                  {job.measured && (
                    <p className="mt-8 max-w-2xl font-display text-[clamp(1.35rem,2.2vw,2rem)] font-medium leading-snug tracking-tight text-foreground">
                      {job.measured.label}
                    </p>
                  )}
                  {job.measured && (
                    <p className="mt-2 max-w-xl font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {job.measured.detail}
                    </p>
                  )}

                  <ul className="mt-8 max-w-2xl space-y-3">
                    {job.contributions.map((item) => (
                      <li
                        key={item}
                        className="border-l border-signal/80 pl-4 text-sm leading-relaxed text-foreground/85"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {job.stack.join(" · ")}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-24 border-t border-border pt-16 lg:mt-32 lg:pt-20">
          <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Áreas de atuação
          </p>
          <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
            {practiceAreas.map((area) => (
              <li key={area.id} className="bg-background p-5 sm:p-6">
                <p className="text-sm font-medium tracking-tight">{area.title}</p>
                <p className="mt-3 text-xs leading-relaxed text-foreground/65">{area.blurb}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {area.tools.join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
