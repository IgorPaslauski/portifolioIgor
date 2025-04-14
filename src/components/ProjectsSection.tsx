import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.error("Error fetching projects:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="projects">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              <span className="gradient-text">Projetos</span> Destacados
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-pulse bg-gray-200 rounded h-6 w-1/2"></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <Card
                  key={index}
                  className="card-hover animate-pulse bg-gray-200 rounded h-48"
                ></Card>
              ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            <span className="gradient-text">Projetos</span> Destacados
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes, apresentando diversos
            tipos de aplicações e tecnologias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden card-hover">
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-portfolio-light-blue/30 text-portfolio-blue"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-portfolio-blue"
                  asChild
                >
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Repo
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-portfolio-blue"
                  asChild
                >
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue hover:text-white"
          >
            Ver Todos os Projetos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
