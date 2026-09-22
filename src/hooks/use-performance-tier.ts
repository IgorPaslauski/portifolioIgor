import { useEffect, useState } from "react";
import { detectPerformanceTier, type PerformanceTier } from "@/lib/performance";

export function usePerformanceTier() {
  const [tier, setTier] = useState<PerformanceTier>("medium");

  useEffect(() => {
    setTier(detectPerformanceTier());
  }, []);

  return tier;
}
