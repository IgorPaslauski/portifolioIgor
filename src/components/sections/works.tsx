import { Link } from "react-router-dom";
import { CaseCard } from "@/components/cases/case-card";
import { featuredProjects, projects } from "@/content";
import { useExperience } from "@/hooks/use-experience";

export function Works() {
  const { setHoveredCase } = useExperience();
  const extra = projects.filter((project) => !project.featured);

  return (
    <section id="obras" className="relative z-10 bg-ink px-gutter py-28 md:py-36">
      <div className="mx-auto max-w-page">
        <p className="text-[12px] uppercase tracking-[0.28em] text-dust">Trabalho</p>
        <h2 className="mt-4 max-w-2xl font-display text-display-md text-paper">
          Cases. Poucos, e com o corte aberto.
        </h2>

        <div className="mt-16 border-b border-paper/10">
          {featuredProjects.map((project, index) => (
            <CaseCard key={project.slug} project={project} index={index} onFocus={setHoveredCase} />
          ))}
        </div>

        {extra.length > 0 && (
          <ul className="mt-16 grid gap-10 md:grid-cols-2">
            {extra.map((project) => (
              <li key={project.slug}>
                <Link
                  to={`/obra/${project.slug}`}
                  className="block"
                  onMouseEnter={() => setHoveredCase(project.slug)}
                  onMouseLeave={() => setHoveredCase(null)}
                >
                  <p className="text-[12px] uppercase tracking-[0.2em] text-dust">{project.kicker}</p>
                  <p className="mt-2 font-display text-3xl text-paper">{project.title}</p>
                  <p className="mt-2 max-w-md text-paper/60">{project.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
