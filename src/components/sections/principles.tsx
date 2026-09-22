import { principles } from "@/content";

export function Principles() {
  return (
    <section className="relative z-10 border-y border-paper/10 px-gutter py-24 md:py-28">
      <div className="mx-auto max-w-page">
        <p className="text-[12px] uppercase tracking-[0.28em] text-dust">Como penso</p>
        <ol className="mt-12 grid gap-12 md:grid-cols-2 xl:grid-cols-3">
          {principles.map((principle) => (
            <li key={principle.index} className="max-w-sm">
              <p className="text-[12px] uppercase tracking-[0.22em] text-ember">{principle.index}</p>
              <h3 className="mt-3 font-display text-2xl text-paper">{principle.title}</h3>
              <p className="mt-3 leading-relaxed text-paper/70">{principle.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
