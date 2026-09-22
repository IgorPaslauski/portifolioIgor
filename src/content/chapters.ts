export const chapters = [
  { id: "boot", index: "01", label: "Início", href: "#boot" },
  { id: "sistema", index: "02", label: "Sistema", href: "#sistema" },
  { id: "traco", index: "03", label: "Trajeto", href: "#traco" },
  { id: "obras", index: "04", label: "Trabalho", href: "#obras" },
  { id: "caderno", index: "05", label: "Caderno", href: "#caderno" },
  { id: "canal", index: "06", label: "Contato", href: "#canal" },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];
