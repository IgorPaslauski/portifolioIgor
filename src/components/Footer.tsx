import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background dark:bg-dark-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-bold gradient-text">Igor.dev</span>
            <p className="mt-2 text-muted-foreground max-w-md">
              Desenvolvedor full stack especializado em criar experiências
              digitais intuitivas e de alto desempenho.
            </p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/IgorPaslauski"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary dark:bg-secondary/80 p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/igor-paslauski-de-oliveira/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary dark:bg-secondary/80 p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/igor_paslauski/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary dark:bg-secondary/80 p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="mailto:igor.paslauski123@gmail.com"
              className="bg-secondary dark:bg-secondary/80 p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} Igor Paslauski Pedroso de Oliveira. Todos os direitos reservados.
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
