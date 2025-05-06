import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import ProjectCard from "./ProjectCard";
import { ProjectDto } from "@/lib/entities/ProjectDto";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + "/projects.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.error("Error fetching projects:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="bg-background py-16 md:py-24 dark:bg-dark-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-foreground">
            <span className="gradient-text">Projetos</span> Destacados
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes, apresentando diversos
            tipos de aplicações e tecnologias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array(4)
              .fill(0)
              .map((_, index) => <ProjectCardSkeleton key={index} />)
            : projects.map((project: ProjectDto) => (
              <ProjectCard key={project.id} {...project} />
            ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Ver Todos os Projetos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
