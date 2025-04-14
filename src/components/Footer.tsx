import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white dark:bg-gray-950 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-bold gradient-text">Igor.dev</span>
            <p className="mt-2 text-gray-400 max-w-md">
              Desenvolvedor full stack especializado em criar experiências
              digitais intuitivas e de alto desempenho.
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/IgorPaslauski"
              target="_blank"
              className="bg-gray-800 dark:bg-gray-800 p-2 rounded-full hover:bg-portfolio-blue transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/igor-paslauski-de-oliveira/"
              target="_blank"
              className="bg-gray-800 dark:bg-gray-800 p-2 rounded-full hover:bg-portfolio-blue transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/igor_paslauski/"
              target="_blank"
              className="bg-gray-800 dark:bg-gray-800 p-2 rounded-full hover:bg-portfolio-blue transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="mailto:igor.paslauski123@gmail.com"
              className="bg-gray-800 dark:bg-gray-800 p-2 rounded-full hover:bg-portfolio-blue transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Igor Paslauski Pedroso de Oliveira. Todos os direitos reservados.
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
