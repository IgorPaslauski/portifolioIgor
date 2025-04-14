
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, LucideGraduationCap, Coffee } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">Sobre <span className="gradient-text">Mim</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça um pouco mais sobre minha jornada como desenvolvedora e o que me motiva a criar soluções através da tecnologia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3>Minha História</h3>
            <p className="text-gray-700">
              Sou uma desenvolvedora full stack apaixonada por criar soluções digitais que fazem a diferença. 
              Minha jornada na programação começou há 5 anos, quando descobri o poder de transformar ideias em código.
            </p>
            <p className="text-gray-700">
              Trabalho com desenvolvimento de aplicações web e mobile, utilizando tecnologias modernas
              para entregar produtos de alta qualidade. Sou movida por desafios e estou sempre
              buscando aprender novas tecnologias e metodologias.
            </p>
            <p className="text-gray-700">
              Quando não estou codando, gosto de ler sobre novas tecnologias, participar de eventos tech
              e contribuir com projetos open source. Acredito que a colaboração é fundamental para
              o crescimento profissional e pessoal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="mb-4 bg-portfolio-light-blue/30 w-12 h-12 rounded-full flex items-center justify-center">
                  <Code className="text-portfolio-blue" />
                </div>
                <h4 className="text-xl font-bold mb-2">Desenvolvimento</h4>
                <p className="text-gray-600">5+ anos de experiência em desenvolvimento web e mobile</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="mb-4 bg-portfolio-light-blue/30 w-12 h-12 rounded-full flex items-center justify-center">
                  <LucideGraduationCap className="text-portfolio-blue" />
                </div>
                <h4 className="text-xl font-bold mb-2">Educação</h4>
                <p className="text-gray-600">Formada em Ciência da Computação e constante aprendizado</p>
              </CardContent>
            </Card>

            <Card className="card-hover sm:col-span-2">
              <CardContent className="pt-6">
                <div className="mb-4 bg-portfolio-light-blue/30 w-12 h-12 rounded-full flex items-center justify-center">
                  <Coffee className="text-portfolio-blue" />
                </div>
                <h4 className="text-xl font-bold mb-2">Interesses</h4>
                <p className="text-gray-600">UX/UI Design, Open Source, AI e Machine Learning</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
