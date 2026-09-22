import { skillGroups } from "./skills";

type LayerKind = "glyphs" | "plate" | "conduits" | "lattice" | "halo";

const kinds: LayerKind[] = ["glyphs", "plate", "conduits", "lattice", "halo"];

export const assemblyLayers = skillGroups.map((group, index) => {
  const kind = kinds[index];
  const side = index % 2 === 0 ? -1 : 1;

  const docks: Record<LayerKind, [number, number, number]> = {
    glyphs: [0, 0.62, 0],
    plate: [0, 0.08, 0.72],
    conduits: [0, 0.02, 0],
    lattice: [0, -0.72, 0],
    halo: [0, 0.04, 0],
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
      side * (2.4 + index * 0.08),
      docks[kind][1] + side * 0.85,
      docks[kind][2] + (kind === "plate" ? 1.8 : 0.9),
    ] as [number, number, number],
    spin: [side * 0.55, side * 0.8, side * 0.15] as [number, number, number],
    enter: 0.36 + index * 0.08,
    settle: 0.48 + index * 0.08,
    color: ["#ede6d6", "#c9c0ae", "#c9a27a", "#e85d04", "#8d8680"][index],
  };
});

export type AssemblyLayer = (typeof assemblyLayers)[number];
