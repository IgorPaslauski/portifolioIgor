
import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-bold gradient-text">Ana.dev</span>
            <p className="mt-2 text-gray-400 max-w-md">
              Desenvolvedora full stack especializada em criar experiências digitais intuitivas e de alto desempenho.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-portfolio-purple transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-portfolio-purple transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-portfolio-purple transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-portfolio-purple transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Ana Silva. Todos os direitos reservados.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
