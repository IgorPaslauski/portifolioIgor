
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold gradient-text">Ana.dev</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-portfolio-purple transition">Home</button>
          <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-portfolio-purple transition">Sobre</button>
          <button onClick={() => scrollToSection('projects')} className="text-gray-700 hover:text-portfolio-purple transition">Projetos</button>
          <button onClick={() => scrollToSection('experience')} className="text-gray-700 hover:text-portfolio-purple transition">Experiência</button>
          <button onClick={() => scrollToSection('certifications')} className="text-gray-700 hover:text-portfolio-purple transition">Certificações</button>
          <button onClick={() => scrollToSection('skills')} className="text-gray-700 hover:text-portfolio-purple transition">Habilidades</button>
          <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-portfolio-purple transition">Contato</button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <div className="flex flex-col space-y-4">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-portfolio-purple transition py-2">Home</button>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-portfolio-purple transition py-2">Sobre</button>
            <button onClick={() => scrollToSection('projects')} className="text-gray-700 hover:text-portfolio-purple transition py-2">Projetos</button>
            <button onClick={() => scrollToSection('experience')} className="text-gray-700 hover:text-portfolio-purple transition py-2">Experiência</button>
            <button onClick={() => scrollToSection('certifications')} className="text-gray-700 hover:text-portfolio-purple transition py-2">Certificações</button>
            <button onClick={() => scrollToSection('skills')} className="text-gray-700 hover:text-portfolio-purple transition py-2">Habilidades</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-portfolio-purple transition py-2">Contato</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
