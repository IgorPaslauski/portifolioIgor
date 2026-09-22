import { principles } from "@/content";
import { SectionHandoff } from "@/components/layout/lab-frame";

export function Principles() {
  return (
    <section id="pensar" className="relative z-10">
      <SectionHandoff from="Trajeto" to="Como penso" />
      <div className="px-gutter py-20 md:py-24">
        <div className="mx-auto max-w-page">
          <p className="text-[12px] uppercase tracking-[0.28em] text-dust">Como penso</p>
          <ol className="mt-12 grid gap-x-12 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
            {principles.map((principle) => (
              <li key={principle.index} className="max-w-sm border-t border-paper/10 pt-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">{principle.index}</p>
                <h3 className="mt-3 font-display text-2xl text-paper">{principle.title}</h3>
                <p className="mt-3 font-body leading-relaxed text-paper/70">{principle.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
