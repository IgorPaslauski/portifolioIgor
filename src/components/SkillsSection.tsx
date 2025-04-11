
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Tecnologias e frameworks para desenvolvimento de interfaces modernas',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Vue.js', level: 80 },
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'Linguagens e frameworks para desenvolvimento de APIs e serviços',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express', level: 88 },
      { name: 'Python', level: 75 },
      { name: 'Django', level: 70 },
      { name: 'Java', level: 65 },
      { name: 'PHP', level: 60 },
    ]
  },
  {
    id: 'database',
    title: 'Banco de Dados',
    description: 'Tecnologias de armazenamento e gerenciamento de dados',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MySQL', level: 75 },
      { name: 'Redis', level: 70 },
      { name: 'Firebase', level: 85 },
    ]
  },
  {
    id: 'tools',
    title: 'Ferramentas & DevOps',
    description: 'Ferramentas para produtividade e implantação de aplicações',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 80 },
      { name: 'CI/CD', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'Google Cloud', level: 75 },
      { name: 'Jest/Testing', level: 85 },
    ]
  }
];

const SkillsSection = () => {
  return (
    <section id="skills" className="bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">Minhas <span className="gradient-text">Habilidades</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tecnologias e ferramentas com as quais tenho experiência e competência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <Card key={category.id} className="card-hover">
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
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

export default SkillsSection;
