
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Calendar, ExternalLink } from 'lucide-react';

const certifications = [
  {
    id: 1,
    title: 'AWS Certified Developer - Associate',
    issuer: 'Amazon Web Services',
    date: 'Dezembro 2023',
    description: 'Certificação que valida conhecimentos em desenvolvimento e manutenção de aplicações na AWS.',
    link: '#'
  },
  {
    id: 2,
    title: 'Professional Full Stack Engineer',
    issuer: 'Meta',
    date: 'Agosto 2023',
    description: 'Especialização avançada em desenvolvimento full stack utilizando React, Node.js e práticas modernas.',
    link: '#'
  },
  {
    id: 3,
    title: 'Google Cloud Professional Developer',
    issuer: 'Google',
    date: 'Março 2023',
    description: 'Certificação que valida experiência em desenvolver e implantar aplicações na Google Cloud.',
    link: '#'
  },
  {
    id: 4,
    title: 'Machine Learning Specialization',
    issuer: 'Stanford University (Coursera)',
    date: 'Outubro 2022',
    description: 'Curso avançado de Machine Learning cobrindo algoritmos, redes neurais e aplicações práticas.',
    link: '#'
  }
];

const CertificationsSection = () => {
  return (
    <section id="certifications">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">Minhas <span className="gradient-text">Certificações</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Certificações e cursos especializados que complementam minha formação e experiência profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((certification) => (
            <Card key={certification.id} className="card-hover">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{certification.title}</CardTitle>
                    <CardDescription>{certification.issuer}</CardDescription>
                  </div>
                  <Award className="h-8 w-8 text-portfolio-purple" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{certification.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{certification.date}</span>
                  </div>
                  <a 
                    href={certification.link} 
                    className="text-portfolio-purple flex items-center text-sm hover:underline"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Ver certificado
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
