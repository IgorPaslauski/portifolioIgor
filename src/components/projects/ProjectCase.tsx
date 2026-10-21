import { ProjectProps } from "./ProjectCard";

const EVIDENCE: Record<number, string[]> = {
  1: [
    "Página com apresentação, serviços, projetos, chamada e contato.",
    "Troca de idioma em um contexto próprio.",
    "Projetos filtrados por categoria.",
    "Formulário com nome, e-mail, assunto e mensagem.",
    "Repositório em TypeScript, com React e Vite.js.",
  ],
  2: [
    "Site com apresentação, sobre, experiência, habilidades e contato.",
    "Habilidades carregadas de JSON.",
    "Título e descrição definidos no documento da página.",
    "Repositório em TypeScript, com React e Vite.js.",
  ],
  3: [
    "Três presets: Default, Wide e Developer.",
    "Largura da conversa e do compositor, tamanho da fonte e expansão de código e tabelas.",
    "Preferências em chrome.storage.sync, com permissão só de storage.",
    "Content script em chatgpt.com. Não lê o texto da conversa e não faz requisição própria.",
    "Testes, typecheck e build que grava a versão no manifest.",
  ],
  4: [
    "Lexer, parser, AST e diagnósticos semânticos.",
    "CLI que traduz um arquivo .suco para C#.",
    "Language Server com autocomplete, hover, go-to-definition, rename e formatter.",
    "Extensão para VS Code e Cursor, com highlight e comandos de traduzir e rodar.",
    "Projetos de compilador, editores, exemplos e tree-sitter ficam em repositórios irmãos.",
  ],
  5: [
    "Título do documento: quiz de português para o ensino médio.",
    "Rotas de login, cadastro e home.",
    "Tema claro e escuro.",
    "Pasta src/ai com Genkit.",
  ],
  6: [
    "Título do documento: PhantShopping.",
    "Telas de login, cadastro, listas e itens.",
    "Next.js com TypeScript.",
  ],
  7: [
    "Hero, sobre, serviços, agendamento, depoimentos, FAQ e contato.",
    "O texto da página apresenta Marisane Almeida, terapia sistêmica e constelação familiar.",
    "React, TypeScript e Vite.js.",
  ],
  8: [
    "Lê o catálogo do PostgreSQL em information_schema.",
    "Gera a SQL com Ollama, executa e tenta corrigir se falhar.",
    "Grava cada tentativa em ai_sql_metrics.csv.",
    "Console .NET 8.",
  ],
  9: [
    "Abre um chat de console contra o endpoint e o modelo configurados.",
    "Histórico com limite, serviço de chat e interface de console.",
    "C# com cancelamento da execução.",
  ],
  10: [
    "Express entrega a pasta public e o Socket.IO sinaliza a chamada.",
    "Salas de até 8 sockets. A sala seguinte abre quando a atual enche.",
    "Repassa offer, answer e candidate ICE entre os pares.",
  ],
  11: [
    "Simulador paralelo fire_mpi_cuda, com vento e contagem via MPI_Reduce.",
    "Visualização em janela com SDL2 e outra em texto com ncurses.",
    "No modo texto: pausa, reinício, vento e probabilidade de propagação.",
  ],
  12: [
    "Servidor gera o par RSA 2048, entrega a chave pública e descriptografa as mensagens.",
    "Vários clientes ao mesmo tempo. A porta do exemplo é 5000.",
    "Há também o projeto FileEncryption no mesmo repositório.",
    "Disciplina Segurança de Dados, UNIJUÍ.",
  ],
  13: [
    "Quatro jogos ao mesmo tempo, desenho da rede e gráfico de fitness.",
    "População, elites, mutação e duração do episódio ajustáveis na página.",
    "HTML, CSS e Canvas. Publicado no GitHub Pages.",
  ],
  14: [
    "Rede feedforward só com NumPy. Sem PyTorch ou TensorFlow.",
    "Arquitetura padrão 8, 16, 12 e 3. Sensores incluem um caminho de Dijkstra até a cauda.",
    "Seleção por torneio, elitismo, crossover e mutação.",
    "Treino em Pygame e reprodução do melhor modelo salvo.",
  ],
  15: [
    "Deck de uma página: Diagnóstico — Mobilidade Urbana Inteligente para Ijuí.",
    "Projeto integrador da UNIJUÍ, publicado no GitHub Pages.",
  ],
  16: [
    "Cola números e calcula n, mínimo, máximo, amplitude, média, mediana e moda.",
    "Variância e desvio populacional e amostral, além do coeficiente de variação.",
    "Histograma com classes de Sturges ou um número escolhido, e download do CSV.",
    "Tudo no navegador, sem envio dos dados.",
  ],
  17: [
    "Interface Next.js com cards de turma e lista de atividades.",
    "API Express com PostgreSQL: usuários, aulas e tarefas.",
    "O repositório my-app-unijui-ionic repete o app com Capacitor, Android e iOS.",
  ],
};

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal";

const ProjectCase = ({
  id,
  image,
  title,
  description,
  tags,
  liveLink,
  repoLink,
  flip,
}: ProjectProps & { flip?: boolean }) => {
  const points = EVIDENCE[id];
  const coverHref = liveLink || repoLink;

  return (
    <article className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${flip ? "lg:pt-24" : ""}`}>
      <a
        href={coverHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative block min-w-0 overflow-hidden bg-muted ${focusRing} ${
          flip ? "lg:col-span-5 lg:col-start-8 lg:row-start-1" : "lg:col-span-7"
        }`}
      >
        {image ? (
          <img
            src={import.meta.env.VITE_API_URL + image}
            alt={title}
            className={`w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.035] ${
              flip ? "aspect-[4/5]" : "aspect-[16/10]"
            }`}
          />
        ) : (
          <div className={`flex flex-col justify-between bg-foreground p-8 text-background ${flip ? "aspect-[4/5]" : "aspect-[16/10]"}`}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">{tags.join(" · ")}</p>
            <p className="max-w-xl font-display text-4xl font-bold leading-[0.95] sm:text-6xl">{title}</p>
          </div>
        )}
      </a>
      <div className={`flex min-w-0 flex-col gap-5 ${flip ? "lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:self-center" : "lg:col-span-5 lg:self-center"}`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">{tags.join(" · ")}</p>
        <h3 className="break-words text-4xl motion-safe:transition-colors sm:text-5xl">
          <a href={coverHref} target="_blank" rel="noopener noreferrer" className={`hover:text-signal ${focusRing}`}>
            {title}
          </a>
        </h3>
        <p className="max-w-md text-lg text-muted-foreground">{description}</p>
        {points && (
          <ul className="max-w-md space-y-2 border-l border-signal pl-4 text-sm leading-relaxed">
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {liveLink ? (
            <a href={liveLink} target="_blank" rel="noopener noreferrer" className={`underline decoration-signal underline-offset-4 hover:text-signal ${focusRing}`}>
              Demonstração
            </a>
          ) : null}
          <a href={repoLink} target="_blank" rel="noopener noreferrer" className={`underline decoration-foreground/30 underline-offset-4 hover:decoration-signal hover:text-signal ${focusRing}`}>
            Repositório
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCase;
