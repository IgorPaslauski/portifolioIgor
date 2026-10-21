const AboutSection = () => {
  return (
    <section id="about" className="scroll-mt-24 bg-foreground px-5 py-24 text-background sm:px-8 lg:px-12 lg:py-32">
      <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">Sobre</p>
      <h2 className="max-w-4xl text-[clamp(1.85rem,3.4vw,3.15rem)] leading-[1.12] text-background">
        Quatro anos em sistemas de gestão, da Tecnicon à Abase.
      </h2>
      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="space-y-6 text-lg leading-relaxed text-background/78 lg:col-span-7">
          <p>
            Na Abase Sistemas e Soluções, desde novembro de 2022, cuido do sistema contábil da solução, faço code review e gerencio backlog. Integrei APIs governamentais do REINF, converti bases para a solução da empresa e atualizei o sistema de Angular 6 para Angular 15. A geração do arquivo do PAD das prefeituras passou a levar 2 minutos.
          </p>
          <p>
            De janeiro de 2021 a outubro de 2022, na Tecnicon, desenvolvi sistemas ERP em Java e EJB. Construí o gerenciamento remoto de Smart TVs, o Kanban de uso interno e externo, e reduzi a transferência de estoque entre filiais de cerca de 2 horas para 3 minutos.
          </p>
          <p>
            Curso Ciência da Computação. Fora do expediente, acompanho pitchs de negócios, eventos de tecnologia e projetos open source. Interesses: UX/UI Design, open source, AI e machine learning.
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="border-t border-background/20 py-5">
            <p className="font-display text-3xl font-bold text-signal">4+</p>
            <p className="mt-1 text-background/80">anos de experiência em desenvolvimento full stack</p>
          </div>
          <div className="border-t border-background/20 py-5">
            <p className="font-display text-3xl font-bold text-signal">Abase</p>
            <p className="mt-1 text-background/80">Desenvolvedor Web Pleno desde novembro de 2022</p>
          </div>
          <div className="border-t border-background/20 py-5">
            <p className="font-display text-3xl font-bold text-signal">Formação</p>
            <p className="mt-1 text-background/80">Cursando Ciência da Computação</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
