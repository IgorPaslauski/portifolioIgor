export const chapters = [
  { id: "boot", index: "00", label: "Entrada", href: "#boot" },
  { id: "sinal", index: "01", label: "Sinal", href: "#sinal" },
  { id: "traco", index: "02", label: "Traço", href: "#traco" },
  { id: "sistema", index: "03", label: "Sistema", href: "#sistema" },
  { id: "obras", index: "04", label: "Obras", href: "#obras" },
  { id: "caderno", index: "05", label: "Caderno", href: "#caderno" },
  { id: "canal", index: "06", label: "Canal", href: "#canal" },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];
