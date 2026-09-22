import { experiences } from "@/content";
import { SectionHandoff } from "@/components/layout/lab-frame";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const marks = [
  { label: "PAD", value: "2min" },
  { label: "REINF", value: "contrato" },
  { label: "front", value: "6 → 15" },
];

export function Trace() {
  return (
    <section id="traco" className="relative z-10 bg-ink">
      <SectionHandoff from="Sistema" to="Trajeto" note="O aparelho some. Sobram os números que ele produziu." />

      <div className="px-gutter pb-28 pt-10 md:pb-36">
        <div className="mx-auto max-w-page">
          <p className="text-[12px] uppercase tracking-[0.28em] text-dust">Trajeto</p>
          <h2 className="mt-4 max-w-xl font-display text-display-md text-paper">
            O que ficou mais rápido, mais claro, mais possível.
          </h2>

          <ol className="mt-16 space-y-24">
            {experiences.map((job, index) => (
              <JobRow key={job.id} index={index} />
            ))}
          </ol>

          <MetricBridge />
        </div>
      </div>
    </section>
  );
}

function JobRow({ index }: { index: number }) {
  const job = experiences[index];
  const { ref, visible } = useInView<HTMLLIElement>(0.2);

  return (
    <li
      ref={ref}
      className={cn(
        "grid gap-8 lg:grid-cols-12",
        visible ? "opacity-100 translate-y-0" : "opacity-40 translate-y-6",
        "transition-all duration-700 ease-editorial",
      )}
    >
      <div className="lg:col-span-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dust">{job.period}</p>
        <h3 className="mt-3 font-display text-3xl text-paper">{job.company}</h3>
        <p className="mt-2 text-sm text-paper/55">{job.role}</p>
        {index === 0 && (
          <ul className="mt-8 space-y-3">
            {marks.map((mark) => (
              <li key={mark.label} className="flex items-baseline justify-between gap-4 border-b border-paper/10 pb-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dust">{mark.label}</span>
                <span className="font-display text-2xl text-ember">{mark.value}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <p className="font-body text-lg leading-relaxed text-paper/75">{job.summary}</p>
        <ul className="mt-6 space-y-3 text-paper/70">
          {job.marks.map((mark) => (
            <li key={mark} className="border-l border-paper/15 pl-4">
              {mark}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-[12px] text-dust">{job.technologies.join(" · ")}</p>
      </div>
    </li>
  );
}

function MetricBridge() {
  const { ref, visible } = useInView<HTMLDivElement>(0.25);

  return (
    <div
      ref={ref}
      className={cn(
        "mt-28 border-t border-paper/10 pt-14 transition-all duration-700 ease-editorial",
        visible ? "opacity-100 translate-y-0" : "opacity-30 translate-y-8",
      )}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-dust">A ponte</p>
      <p className="metric-display mt-4 text-paper">
        2h <span className="text-ember">→</span> 3min
      </p>
      <p className="mt-4 max-w-md font-body text-paper/65">
        Transferência de estoque na Tecnicon. O número ainda é o melhor slide que eu tenho — e o primeiro case que
        o trabalho precisa mostrar, não só contar.
      </p>
    </div>
  );
}
