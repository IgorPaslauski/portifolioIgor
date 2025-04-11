
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const experiences = [
  {
    id: 1,
    role: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    period: 'Jan 2022 - Presente',
    description: 'Liderança na criação de aplicações web responsivas e de alta performance utilizando React e TypeScript. Implementação de testes automatizados e otimização de performance.',
    achievements: [
      'Reduzi o tempo de carregamento das páginas em 40%',
      'Implementei sistema de CI/CD que diminuiu bugs em produção em 30%',
      'Mentoria para desenvolvedores junior e pleno da equipe'
    ],
    technologies: ['React', 'TypeScript', 'GraphQL', 'Jest']
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'Innovate Digital',
    period: 'Mar 2020 - Dez 2021',
    description: 'Desenvolvimento de aplicações web completas, atuando tanto no frontend quanto no backend. Construção de APIs RESTful e integração com serviços de terceiros.',
    achievements: [
      'Desenvolvi portal de clientes que aumentou a retenção em 25%',
      'Implementei sistema de notificações em tempo real',
      'Migração de arquitetura monolítica para microserviços'
    ],
    technologies: ['Node.js', 'Express', 'React', 'MongoDB']
  },
  {
    id: 3,
    role: 'Web Developer',
    company: 'CreativeLab Agency',
    period: 'Jun 2018 - Fev 2020',
    description: 'Desenvolvimento de websites e landing pages para diversos clientes, com foco em design responsivo e otimização para mecanismos de busca.',
    achievements: [
      'Desenvolvi mais de 20 sites para clientes de diferentes setores',
      'Implementei estratégias de SEO que aumentaram o tráfego em 60%',
      'Criei sistema de gerenciamento de conteúdo personalizado'
    ],
    technologies: ['JavaScript', 'HTML/CSS', 'WordPress', 'PHP']
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">Minha <span className="gradient-text">Experiência</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Minha trajetória profissional como desenvolvedora e as empresas com as quais colaborei.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience) => (
            <Card key={experience.id} className="card-hover">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <CardTitle className="text-2xl">{experience.role}</CardTitle>
                    <CardDescription className="text-lg font-medium">{experience.company}</CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit text-portfolio-purple border-portfolio-purple">
                    {experience.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{experience.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Conquistas Principais:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {experience.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-portfolio-light-purple/30 text-portfolio-purple">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
