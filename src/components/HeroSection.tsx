import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="pt-24 md:pt-32 pb-16 md:pb-24 bg-background dark:bg-dark-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <p className="text-primary font-semibold mb-4">
              Desenvolvedor Full Stack
            </p>
            <h1 className="mb-6 text-foreground">
              Olá, eu sou{" "}
              <span className="gradient-text">
                Ígor Paslauski Pedroso de Oliveira
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Transformando ideias em experiências digitais intuitivas através
              de código limpo e design moderno. Especializado em desenvolvimento
              front-end e back-end com foco em React, Node.js, C# e TypeScript.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Ver Projetos
              </Button>
              <a
                href={import.meta.env.VITE_API_URL + "/cv-igor-paslauski.pdf"}
                download="cv-igor-paslauski.pdf"
                className="inline-block border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-md text-center transition-colors"
              >
                Baixar CV
              </a>
            </div>
            <div className="flex mt-8 space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-foreground hover:text-primary"
                onClick={() =>
                  window.open("https://github.com/IgorPaslauski", "_blank")
                }
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-foreground hover:text-primary"
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/in/igor-paslauski-de-oliveira/",
                    "_blank"
                  );
                }}
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-foreground hover:text-primary"
                onClick={() => {
                  window.open("mailto:igor.paslauski123@gmail.com", "_blank");
                }}
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/20 rounded-full opacity-30 filter blur-3xl dark:bg-primary/10"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-primary/10 rounded-full opacity-20 filter blur-3xl dark:bg-primary/05"></div>
              <div className="relative z-10 bg-card rounded-2xl overflow-hidden dark:shadow-dark-background">
                <img
                  src={import.meta.env.VITE_API_URL + "/perfil.jpg"}
                  alt="Igor Paslauski - Desenvolvedor Full Stack"
                  className="w-full h-auto object-cover rounded-full"
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
