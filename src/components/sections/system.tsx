import { principles, skillGroups } from "@/content";

export function System() {
  return (
    <section id="sistema" className="relative z-10 px-gutter py-28 md:py-36">
      <div className="mx-auto max-w-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">03 · Sistema</p>
            <h2 className="mt-4 font-display text-display-md text-paper">Como o ofício se organiza.</h2>
          </div>
          <p className="font-body text-lg text-paper/75 lg:col-span-6 lg:col-start-7 lg:pt-10">
            Não trabalho com uma lista de ferramentas. Trabalho com um sistema: linguagem, dado,
            interface, operação. O restante é critério.
          </p>
        </div>

        <div className="mt-16 grid gap-px bg-paper/10 md:grid-cols-2 xl:grid-cols-5">
          {skillGroups.map((group) => (
            <div key={group.id} className="bg-ink p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-ember">{group.title}</h3>
              <ul className="mt-5 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-paper">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h3 className="font-display text-3xl text-paper">Notas de operação</h3>
          <ol className="mt-10 divide-y divide-paper/10 border-y border-paper/10">
            {principles.map((principle) => (
              <li key={principle.index} className="grid gap-4 py-8 md:grid-cols-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-dust md:col-span-2">
                  {principle.index}
                </p>
                <h4 className="font-display text-2xl text-paper md:col-span-4">{principle.title}</h4>
                <p className="font-body text-paper/75 md:col-span-6">{principle.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
