import { Github, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="font-display text-3xl font-medium text-foreground">Ígor</span>
            <p className="mt-2 max-w-md text-muted-foreground">
              Desenvolvedor full stack especializado em criar experiências
              digitais intuitivas e de alto desempenho.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="https://github.com/IgorPaslauski"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="border border-border p-2 text-foreground transition-colors hover:border-signal hover:text-signal"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/igor-paslauski-de-oliveira/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="border border-border p-2 text-foreground transition-colors hover:border-signal hover:text-signal"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/igor_paslauski/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="border border-border p-2 text-foreground transition-colors hover:border-signal hover:text-signal"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="mailto:igor.paslauski123@gmail.com"
              aria-label="Email"
              className="border border-border p-2 text-foreground transition-colors hover:border-signal hover:text-signal"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-sm text-muted-foreground">
          © {currentYear} Igor Paslauski Pedroso de Oliveira. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
