import type { CaseBase, Decision } from "./types";

/** Grounded in https://github.com/IgorPaslauski/Fire-sim README — no invented benchmarks. */
export const fireSimCase: CaseBase & {
  problem: string;
  context: string;
  binaries: { id: string; label: string; detail: string }[];
  controls: { key: string; action: string }[];
  stats: string[];
  decisions: Decision[];
} = {
  id: "fire-sim",
  index: "04",
  title: "Fire Sim",
  subtitle: "Simulação de incêndio em floresta com MPI, CUDA e visualização.",
  status: "published",
  stack: ["C", "MPI", "CUDA", "SDL2", "ncurses"],
  repo: {
    href: "https://github.com/IgorPaslauski/Fire-sim",
    label: "Repositório",
    external: true,
  },
  sources: ["README.md (IgorPaslauski/Fire-sim)"],
  problem:
    "Rodar e observar a propagação do fogo em grade — com paralelismo de verdade e feedback visual em tempo real — sem separar o núcleo de compute da instrumentação.",
  context:
    "Três superfícies no mesmo projeto: simulador MPI+CUDA voltado a benchmarks, visualização SDL2 e visualização textual ncurses com vento e painel de estatísticas.",
  binaries: [
    {
      id: "mpi",
      label: "fire_mpi_cuda",
      detail: "Simulador paralelo MPI + CUDA; snapshots PPM opcionais; estatísticas via MPI_Reduce.",
    },
    {
      id: "sdl",
      label: "visualizacao_fire_sdl",
      detail: "Janela gráfica SDL2 com menu de configuração.",
    },
    {
      id: "ncurses",
      label: "visualizacao_fire",
      detail: "Modo texto ncurses: vento, pausa, reinício e painel ao vivo.",
    },
  ],
  controls: [
    { key: "V", action: "Cicla vento N → L → S → O" },
    { key: "+ / −", action: "Ajusta probabilidade de propagação" },
    { key: "P", action: "Pausa / continua" },
    { key: "R", action: "Reinicia a floresta" },
    { key: "Q", action: "Encerra" },
  ],
  stats: [
    "Passo atual",
    "Direção do vento",
    "Probabilidade base",
    "Árvores / fogo / cinzas",
    "% aproximado de área queimada",
  ],
  decisions: [
    {
      title: "Compute e viz como binários irmãos",
      body: "make gera fire_mpi_cuda e visualizacao_fire; a variante SDL2 entra quando sdl2-config está disponível — mesmo domínio, interfaces distintas.",
    },
    {
      title: "Agregação global com MPI_Reduce",
      body: "Contagens locais (sem halos) reduzem no MASTER para árvores, fogo, cinzas e percentual de área.",
    },
    {
      title: "Instrumentação no terminal",
      body: "A viz ncurses expõe vento e estatísticas sem exigir GPU display — útil para validar o modelo antes da janela SDL.",
    },
  ],
};
