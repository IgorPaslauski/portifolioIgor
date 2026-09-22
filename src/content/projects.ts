export type Project = {
  slug: string;
  title: string;
  kicker: string;
  year: string;
  kind: "publico" | "interno";
  accent: string;
  summary: string;
  problem: string;
  context: string;
  role: string;
  result: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "purosuco",
    title: "PuroSuco",
    kicker: "Linguagem + compilador",
    year: "2026",
    kind: "publico",
    accent: "#E85D04",
    summary:
      "Uma linguagem experimental baseada em memes brasileiros — com lexer, parser, AST, diagnósticos, formatter, runner e Language Server.",
    problem:
      "Compiladores costumam parecer inacessíveis. Eu queria um laboratório real de linguagem, não um tutorial que para no lexer.",
    context:
      "Projeto pessoal em C# / .NET 8. A premissa: o meme precisa fazer sentido com a operação. public vira AMOSTRADINHO porque está exposto; = vira RECEBA porque a variável recebe um valor.",
    role: "Autor. Lexer, parser e AST próprios, CLI, analisador semântico, formatter, runner, LSP e extensão para VS Code / Cursor.",
    result:
      "Transpilação para C#, inspeção de tokens e AST, check semântico, autocomplete, hover, go-to-definition, rename, semantic tokens e quick fixes no editor.",
    technologies: ["C#", ".NET 8", "LSP", "Tree-sitter", "VS Code"],
    repoUrl: "https://github.com/IgorPaslauski/purosuco",
    featured: true,
  },
  {
    slug: "pad",
    title: "PAD em dois minutos",
    kicker: "Performance em produção",
    year: "2023—",
    kind: "interno",
    accent: "#D4A373",
    summary:
      "A geração do arquivo PAD das prefeituras deixou de ser uma espera e passou a caber no expediente.",
    problem:
      "Prefeituras dependiam de um arquivo oficial cujo processamento travava o dia. Esperar não é um detalhe — é custo operacional.",
    context:
      "Sistema contábil da Abase, usado por órgãos públicos. Volume real, regras fiscais e bases herdadas.",
    role: "Desenvolvimento e otimização do fluxo de geração, do acesso a dados até o fechamento do arquivo.",
    result: "Geração em cerca de 2 minutos. O lote cabe no expediente; o sistema deixa de ser o gargalo.",
    technologies: ["C#", "PostgreSQL", "Sybase"],
    featured: true,
  },
  {
    slug: "reinf",
    title: "REINF como contrato",
    kicker: "Integração governamental",
    year: "2023—",
    kind: "interno",
    accent: "#C9C0AE",
    summary:
      "Uma ponte entre o sistema contábil e a API da Receita. O governo não espera um retry amigável.",
    problem:
      "Obrigações acessórias não perdoam payload errado. Integrar com o REINF exige contrato rígido, rastreio e falha explícita.",
    context:
      "Abase. Clientes precisam enviar eventos fiscais a partir do próprio sistema, sem exportar planilha e rezar.",
    role: "Desenho e implementação da integração: autenticação, montagem de eventos, tratamento de retorno e observabilidade.",
    result:
      "Envio direto pela solução da empresa. Menos operação manual, mais rastreabilidade e um ponto único de falha bem definido.",
    technologies: ["C#", "APIs REST", "TypeScript", "Angular"],
    featured: true,
  },
  {
    slug: "angular-15",
    title: "Angular 6 → 15",
    kicker: "Modernização sem drama",
    year: "2023",
    kind: "interno",
    accent: "#E07A3D",
    summary:
      "Uma base que tinha parado no tempo voltou a ser evolutiva — sem desligar o produto.",
    problem:
      "Angular 6 travava dependências, contratação e segurança. Reescrever do zero era romance. Migrar era engenharia.",
    context:
      "Front do produto Abase em produção, com usuários ativos e um backlog que não podia congelar por um trimestre.",
    role: "Condução da atualização: quebras de API, build, testes de regressão e o corte em fatias que o time conseguia revisar.",
    result:
      "Stack atual, toolchain vivo e um front que volta a receber evolução em vez de remendo.",
    technologies: ["Angular", "TypeScript", "RxJS"],
    featured: true,
  },
  {
    slug: "estoque",
    title: "Duas horas, três minutos",
    kicker: "ERP · estoque",
    year: "2021—2022",
    kind: "interno",
    accent: "#A3B18A",
    summary:
      "A transferência de estoque entre filiais deixou de ser um processo noturno.",
    problem:
      "Dois horas para mover saldo entre filiais significa estoque mentiroso no meio do dia e gente esperando o sistema.",
    context:
      "Tecnicon. ERP usado em operação real, com SQL Server / Firebird e regras de depósito que não cabem num tutorial.",
    role: "Identificação do gargalo e reescrita do fluxo de transferência, do acesso a dados à confirmação entre filiais.",
    result: "De 2 horas para 3 minutos. O número ainda é o melhor slide que eu tenho.",
    technologies: ["Java", "EJB", "SQL Server", "Firebird"],
    featured: true,
  },
  {
    slug: "folgen-group",
    title: "Folgen Group",
    kicker: "Presença digital",
    year: "2024",
    kind: "publico",
    accent: "#EDE6D6",
    summary: "Landing page para uma empresa — narrativa curta, carga rápida, React no osso.",
    problem:
      "A empresa precisava de um endereço na web que não parecesse template e que pudesse ser publicado sem cerimônia.",
    context: "Projeto autoral. Escopo deliberadamente enxuto: uma página, uma história, um contato.",
    role: "Direção, implementação e deploy.",
    result: "Site no ar, estável, com stack previsível.",
    technologies: ["React", "Vite"],
    image: "/projects/folgen-group/image.png",
    liveUrl: "https://igorpaslauski.github.io/folgen-group",
    repoUrl: "https://github.com/IgorPaslauski/folgen-group",
    featured: true,
  },
  {
    slug: "eduarda",
    title: "Portfólio Eduarda",
    kicker: "Site pessoal",
    year: "2024",
    kind: "publico",
    accent: "#D4A373",
    summary:
      "Um portfólio para outra pessoa. O exercício era sumir atrás do conteúdo dela.",
    problem:
      "Precisava de um site que apresentasse o trabalho com clareza — sem o barulho visual de um template de agência.",
    context: "Projeto para cliente/parceira, publicado em GitHub Pages.",
    role: "Implementação completa em React e Vite, do layout à publicação.",
    result: "Página viva, navegação simples, código aberto.",
    technologies: ["React", "Vite"],
    image: "/projects/eduarda/image.png",
    liveUrl: "https://igorpaslauski.github.io/portifolio-eduarda/",
    repoUrl: "https://github.com/IgorPaslauski/portifolio-eduarda",
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
