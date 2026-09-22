import { skillGroups } from "./skills";

type LayerKind = "drives" | "board" | "chips" | "display" | "heatsink";

const kinds: LayerKind[] = ["chips", "display", "board", "drives", "heatsink"];

export const assemblyLayers = skillGroups.map((group, index) => {
  const kind = kinds[index];
  const side = index % 2 === 0 ? -1 : 1;

  const docks: Record<LayerKind, [number, number, number]> = {
    drives: [0, -1.08, 0.08],
    board: [0, -0.58, 0.02],
    chips: [0, -0.32, 0.02],
    display: [0, 0.18, -0.52],
    heatsink: [0, 0.42, 0.12],
  };

  const lines = [
    "A matéria-prima. O que o sistema fala de fato.",
    "Onde a pessoa toca o sistema — e onde ele responde.",
    "O meio. Contrato, API, o que segura as pontas.",
    "Memória longa. O estado que precisa sobreviver ao deploy.",
    "O que mantém isso no ar quando ninguém está olhando.",
  ];

  return {
    ...group,
    index,
    kind,
    line: lines[index],
    dock: docks[kind],
    exploded: [
      side * (3.1 + index * 0.12),
      docks[kind][1] + side * 1.15,
      docks[kind][2] + (kind === "display" ? -2.2 : 1.4),
    ] as [number, number, number],
    spin: [side * 0.7, side * 0.45, 0] as [number, number, number],
    enter: 0.3 + index * 0.1,
    settle: 0.44 + index * 0.1,
    color: ["#d4c7b0", "#ede6d6", "#c9a27a", "#e85d04", "#8d8680"][index],
  };
});

export type AssemblyLayer = (typeof assemblyLayers)[number];
