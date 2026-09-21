import { Link } from "react-router-dom";
import { CaseCard } from "@/components/cases/case-card";
import { featuredProjects, projects } from "@/content";
import { useExperience } from "@/hooks/use-experience";

export function Works() {
  const { setHoveredCase } = useExperience();
  const extra = projects.filter((project) => !project.featured);

  return (
    <section id="obras" className="relative z-10 px-gutter py-28 md:py-36">
      <div className="mx-auto max-w-page">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">04 · Obras</p>
            <h2 className="mt-4 font-display text-display-md text-paper">O que vale o clique.</h2>
          </div>
          <p className="font-body text-lg text-paper/75 lg:col-span-5 lg:pt-10">
            Cases de produção e um compilador. Passe o cursor: a cena responde. Toque ou teclado
            abrem o estudo.
          </p>
        </div>

        <div className="mt-14 border-b border-paper/10">
          {featuredProjects.map((project, index) => (
            <CaseCard key={project.slug} project={project} index={index} onFocus={setHoveredCase} />
          ))}
        </div>

        {extra.length > 0 && (
          <div className="mt-16">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-dust">Também no mapa</h3>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {extra.map((project) => (
                <li key={project.slug}>
                  <Link
                    to={`/obra/${project.slug}`}
                    className="block border border-paper/10 p-5 transition-colors hover:border-ember"
                    onMouseEnter={() => setHoveredCase(project.slug)}
                    onMouseLeave={() => setHoveredCase(null)}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember">{project.kicker}</p>
                    <p className="mt-2 font-display text-2xl">{project.title}</p>
                    <p className="mt-2 text-sm text-paper/65">{project.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
