import type { CaseBase, Decision } from "./types";

/** Grounded in https://github.com/IgorPaslauski/LayoutPlus README — no fabricated screenshots. */
export const layoutPlusCase: CaseBase & {
  problem: string;
  context: string;
  presets: { id: string; label: string; hint: string }[];
  range: { conversation: string; composer: string; font: string };
  privacy: string[];
  decisions: Decision[];
} = {
  id: "layout-plus",
  index: "03",
  title: "Layout+",
  subtitle: "Extensão Manifest V3 para largura e tipografia do ChatGPT.",
  status: "published",
  stack: ["TypeScript", "Manifest V3"],
  repo: {
    href: "https://github.com/IgorPaslauski/LayoutPlus",
    label: "Repositório",
    external: true,
  },
  live: {
    href: "https://github.com/IgorPaslauski/LayoutPlus/releases/latest",
    label: "Release",
    external: true,
  },
  sources: ["README.md (IgorPaslauski/LayoutPlus)"],
  problem:
    "A conversa no ChatGPT fica estreita demais para código e tabelas; quem trabalha com texto técnico precisa de largura e tipografia sem brigar com a SPA.",
  context:
    "MVP experimental, não afiliado à OpenAI. Overrides CSS best-effort: o DOM do ChatGPT muda e nem todo componente honra cada preferência.",
  presets: [
    { id: "default", label: "Default", hint: "Leitura confortável" },
    { id: "wide", label: "Wide", hint: "Mais coluna útil" },
    { id: "developer", label: "Developer", hint: "Código e tabelas" },
  ],
  range: {
    conversation: "640–2000 px",
    composer: "640–2000 px",
    font: "12–22 px",
  },
  privacy: [
    "Permissão apenas storage.",
    "Content script só em https://chatgpt.com/*.",
    "Não lê o texto da conversa e não faz requisição própria.",
    "Persiste layoutPlusSettings em chrome.storage.sync.",
  ],
  decisions: [
    {
      title: "Presets + controles independentes",
      body: "Default, Wide e Developer, com larguras de conversa e compositor separadas, tamanho de fonte e expansão de code/tables.",
    },
    {
      title: "Superfície mínima de permissão",
      body: "Só storage; o content script observa DOM/geometria para offset de botões — sem telemetria própria.",
    },
    {
      title: "Build carimba a versão",
      body: "A versão em package.json é escrita no manifest no build (stamp-manifest).",
    },
  ],
};
