import { Card, CardContent } from '@/components/ui/card';
import { Code, LucideGraduationCap, Coffee } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="bg-secondary/50 dark:bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça um pouco mais sobre minha jornada como desenvolvedor e o que me motiva a criar soluções através da tecnologia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3>Minha História</h3>
            <p className="text-foreground">
              Sou um desenvolvedor full stack apaixonado por criar soluções digitais que fazem a diferença. 
              Minha jornada na programação começou há 4 anos, quando descobri o poder de transformar ideias em código.
            </p>
            <p className="text-foreground">
              Trabalho com desenvolvimento de aplicações web e mobile, utilizando tecnologias modernas
              para entregar produtos de alta qualidade. Sou movido por desafios e estou sempre
              buscando aprender novas tecnologias e metodologias.
            </p>
            <p className="text-foreground">
              Quando não estou codando, gosto de ver pitchs de negócios, participar de eventos tech
              e contribuir com projetos open source. Acredito que a colaboração é fundamental para
              o crescimento profissional e pessoal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="card-hover bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 bg-portfolio-light-blue/20 dark:bg-portfolio-blue/20 w-12 h-12 rounded-full flex items-center justify-center">
                  <Code className="text-portfolio-blue dark:text-portfolio-light-blue" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-foreground">Desenvolvimento</h4>
                <p className="text-muted-foreground">4+ anos de experiência em desenvolvimento full stack</p>
              </CardContent>
            </Card>

            <Card className="card-hover bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 bg-portfolio-light-blue/20 dark:bg-portfolio-blue/20 w-12 h-12 rounded-full flex items-center justify-center">
                  <LucideGraduationCap className="text-portfolio-blue dark:text-portfolio-light-blue" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-foreground">Educação</h4>
                <p className="text-muted-foreground">Cursando Ciência da Computação sempre em constante aprendizado</p>
              </CardContent>
            </Card>

            <Card className="card-hover bg-card sm:col-span-2">
              <CardContent className="pt-6">
                <div className="mb-4 bg-portfolio-light-blue/20 dark:bg-portfolio-blue/20 w-12 h-12 rounded-full flex items-center justify-center">
                  <Coffee className="text-portfolio-blue dark:text-portfolio-light-blue" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-foreground">Interesses</h4>
                <p className="text-muted-foreground">UX/UI Design, Open Source, AI e Machine Learning</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
