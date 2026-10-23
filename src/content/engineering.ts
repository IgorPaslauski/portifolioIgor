/**
 * Engineering narrative — grounded in public/experiences.json + skills.json.
 * Typos corrected for publication; meaning unchanged. No invented metrics.
 */

export type JobChapter = {
  id: string;
  period: string;
  role: string;
  company: string;
  context: string;
  contributions: string[];
  measured?: { label: string; detail: string };
  stack: string[];
};

export type PracticeArea = {
  id: string;
  title: string;
  blurb: string;
  tools: string[];
};

export const engineeringIntro = {
  index: "04",
  headline: "Como penso, construo e mantenho sistemas que precisam durar.",
  lead: "Quatro anos em sistemas de gestão — da Tecnicon à Abase. O foco é estrutura, revisão e entrega com evidência no código e nos registros de processo.",
} as const;

/** Chronological display: present first (Abase → Tecnicon). */
export const jobChapters: JobChapter[] = [
  {
    id: "abase",
    period: "Nov 2022 — Presente",
    role: "Desenvolvedor Web Pleno",
    company: "Abase Sistemas e Soluções",
    context:
      "Desenvolvimento de aplicações web no produto da empresa — HTML, CSS, JavaScript, TypeScript, Angular, PostgreSQL, Sybase e adjacentes.",
    contributions: [
      "Responsável pelo sistema contábil da solução, além de code review e gerenciamento de backlog.",
      "Conversões de base de dados para integrar com a solução da empresa.",
      "Sistemas de integração com APIs governamentais (REINF).",
      "Atualização do sistema de Angular 6 para Angular 15.",
    ],
    measured: {
      label: "PAD das prefeituras em cerca de 2 minutos",
      detail: "Melhoria no processo de geração do arquivo do PAD.",
    },
    stack: [
      "C#",
      "TypeScript",
      "Angular",
      "ExtJS",
      "Sybase",
      "PostgreSQL",
      "ElasticSearch",
      "Grafana",
    ],
  },
  {
    id: "tecnicon",
    period: "Jan 2021 — Out 2022",
    role: "Programador JR",
    company: "Tecnicon Sistemas Gerenciais",
    context:
      "Desenvolvimento de sistemas ERP com Java, EJB, HTML/CSS, JavaScript, SQL Server e Firebird.",
    contributions: [
      "Ferramenta de gerenciamento remoto de Smart TVs integrada ao sistema para uso interno.",
      "Criação e manutenção do sistema de Kanban da empresa, para uso interno e externo.",
    ],
    measured: {
      label: "Transferência de estoque: ~2 horas → 3 minutos",
      detail: "Otimização do processo de transferência de produto entre filiais.",
    },
    stack: ["Java", "EJB", "HTML/CSS", "JavaScript", "SQL Server", "Firebird", "CI/CD"],
  },
];

/**
 * Practice areas — tools only from experiences.json + skills.json (no invented stacks).
 */
export const practiceAreas: PracticeArea[] = [
  {
    id: "architecture",
    title: "Arquitetura e sistemas complexos",
    blurb:
      "Evoluir produtos de gestão no tempo — versões de framework, contabilidade e fluxos que atravessam filiais e órgãos públicos.",
    tools: ["Angular", "Java", "EJB", "C#"],
  },
  {
    id: "backend",
    title: "Backend e modelagem de domínio",
    blurb:
      "Serviços e regras no núcleo do ERP e do sistema contábil, com revisão de código e fila de trabalho explícita.",
    tools: ["C#", "Java", "TypeScript", "Node.js"],
  },
  {
    id: "interfaces",
    title: "Interfaces e experiência de produto",
    blurb:
      "Telas e fluxos no produto — ExtJS e Angular no dia a dia; React e TypeScript nos projetos próprios.",
    tools: ["TypeScript", "Angular", "ExtJS", "React", "HTML/CSS"],
  },
  {
    id: "data",
    title: "Integrações e dados",
    blurb:
      "REINF e conversões de base; PostgreSQL e Sybase no produto; observabilidade com ElasticSearch e Grafana.",
    tools: ["PostgreSQL", "Sybase", "Firebird", "SQL Server", "ElasticSearch", "Grafana"],
  },
  {
    id: "tooling",
    title: "Ferramentas, automação e experimentação",
    blurb:
      "CI/CD no percurso da Tecnicon; Git e Docker no repertório atual; experimentação contínua em projetos open source.",
    tools: ["Git", "Docker", "CI/CD", "AWS"],
  },
];

export const engineeringAside = {
  formation: "Cursando Ciência da Computação",
  years: "4+ anos em desenvolvimento full stack",
} as const;
