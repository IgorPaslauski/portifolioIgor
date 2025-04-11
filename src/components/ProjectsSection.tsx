
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Plataforma de comércio eletrônico completa com painel de administração, pagamentos e análises.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveLink: '#',
    repoLink: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Aplicativo de gerenciamento de tarefas com recursos de arrastar e soltar, filtros e etiquetas coloridas.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
    tags: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    liveLink: '#',
    repoLink: '#',
  },
  {
    id: 3,
    title: 'Health Tracking Dashboard',
    description: 'Dashboard para acompanhamento de indicadores de saúde com gráficos e alertas personalizados.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['Next.js', 'TypeScript', 'Chart.js', 'PostgreSQL'],
    liveLink: '#',
    repoLink: '#',
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4"><span className="gradient-text">Projetos</span> Destacados</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes, apresentando diversos tipos de aplicações e tecnologias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
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
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-portfolio-light-purple/30 text-portfolio-purple">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" className="text-portfolio-purple" asChild>
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Repo
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="text-portfolio-purple" asChild>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-portfolio-purple text-portfolio-purple hover:bg-portfolio-purple hover:text-white">
            Ver Todos os Projetos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
