import { skillGroups } from "./skills";

export const assemblyLayers = skillGroups.map((group, index) => {
  const dockY = -1.05 + index * 0.52;
  const side = index % 2 === 0 ? -1 : 1;

  return {
    ...group,
    index,
    dock: [0, dockY, 0] as [number, number, number],
    exploded: [side * (2.8 + index * 0.15), dockY + side * 1.4, -1.2 + index * 0.2] as [
      number,
      number,
      number,
    ],
    enter: 0.34 + index * 0.1,
    settle: 0.46 + index * 0.1,
    color: ["#c9c0ae", "#ede6d6", "#d4a373", "#e85d04", "#9a9184"][index],
  };
});
