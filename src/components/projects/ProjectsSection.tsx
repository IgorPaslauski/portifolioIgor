import { useEffect, useState } from "react";
import { ProjectDto } from "@/lib/entities/ProjectDto";
import ProjectCase from "./ProjectCase";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + "/projects.json")
      .then((response) => response.json())
      .then((data: ProjectDto[]) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" aria-busy={loading} className="scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mb-16 flex flex-col gap-6 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">Selected work</p>
          <h2>Projetos em destaque</h2>
        </div>
        <p className="max-w-sm text-muted-foreground lg:text-right">
          Repositórios públicos. Cada caso descreve só o que está no código ou no README.
        </p>
      </div>
      {loading && <p className="sr-only">Carregando projetos</p>}
      <div className="min-h-[36rem] space-y-20 lg:space-y-8">
        {loading
          ? Array.from({ length: 2 }, (_, index) => (
              <div key={index} className={`grid gap-6 lg:grid-cols-12 ${index === 1 ? "lg:pt-16" : ""}`}>
                <div className={`bg-muted ${index === 1 ? "aspect-[4/5] lg:col-span-5 lg:col-start-8" : "aspect-[16/10] lg:col-span-7"}`} />
                <div className="space-y-3 lg:col-span-5">
                  <div className="h-3 w-24 bg-muted" />
                  <div className="h-12 w-2/3 bg-muted" />
                  <div className="h-4 w-full bg-muted" />
                </div>
              </div>
            ))
          : projects.map((project, index) => (
              <ProjectCase key={project.id} {...project} flip={index % 2 === 1} />
            ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
