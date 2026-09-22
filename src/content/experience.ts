export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  current?: boolean;
  summary: string;
  marks: string[];
  technologies: string[];
};

export const experiences: Experience[] = [
  {
    id: "abase",
    role: "Desenvolvedor Web Pleno",
    company: "Abase Sistemas e Soluções",
    period: "Nov 2022 — presente",
    current: true,
    summary:
      "Cuido do sistema contábil da solução: código, review e backlog. O trabalho mora na interseção entre regra fiscal brasileira e software que precisa responder rápido.",
    marks: [
      "Responsável pelo sistema contábil — desenvolvimento, code review e gerenciamento de backlog.",
      "Converti bases de dados para integrar clientes à plataforma da empresa.",
      "Criei a integração com a API governamental do REINF.",
      "Migrei o front de Angular 6 para Angular 15 sem parar o produto.",
      "Reduzi a geração do arquivo PAD das prefeituras para cerca de 2 minutos.",
    ],
    technologies: [
      "C#",
      "TypeScript",
      "Angular",
      "ExtJS",
      "Sybase",
      "PostgreSQL",
      "Elasticsearch",
      "Grafana",
    ],
  },
  {
    id: "tecnicon",
    role: "Programador Jr",
    company: "Tecnicon Sistemas Gerenciais",
    period: "Jan 2021 — Out 2022",
    summary:
      "ERP de ponta a ponta: Java, EJB e bancos que carregam o chão de fábrica. Foi onde aprendi que processo lento é um bug de produto.",
    marks: [
      "Construí o gerenciamento remoto de Smart TVs, integrado ao ERP para uso interno.",
      "Otimizei a transferência de estoque entre filiais: de 2 horas para 3 minutos.",
      "Criei e mantive o Kanban da empresa, usado internamente e por clientes.",
    ],
    technologies: ["Java", "EJB", "JavaScript", "SQL Server", "Firebird", "CI/CD"],
  },
];
