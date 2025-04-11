
import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <p className="text-portfolio-purple font-semibold mb-4">Desenvolvedora Full Stack</p>
            <h1 className="mb-6">
              Olá, eu sou <span className="gradient-text">Ana Silva</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Transformando ideias em experiências digitais intuitivas através de código limpo e design moderno.
              Especializada em desenvolvimento front-end e back-end com foco em React, Node.js e TypeScript.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-portfolio-purple hover:bg-portfolio-dark-purple">
                Ver Projetos
              </Button>
              <Button variant="outline" className="border-portfolio-purple text-portfolio-purple hover:bg-portfolio-purple hover:text-white">
                Baixar CV
              </Button>
            </div>
            <div className="flex mt-8 space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-portfolio-light-purple rounded-full opacity-30 filter blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-portfolio-purple rounded-full opacity-20 filter blur-3xl"></div>
              <div className="relative z-10 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                  alt="Ana Silva - Desenvolvedora"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
