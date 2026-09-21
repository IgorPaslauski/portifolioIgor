import { useContext } from "react";
import { ExperienceContext } from "@/state/experience-store";

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience must be used within ExperienceProvider");
  }
  return context;
}
