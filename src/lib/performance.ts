export type PerformanceTier = "high" | "medium" | "low";

export function detectPerformanceTier(): PerformanceTier {
  if (typeof window === "undefined") return "medium";

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  const saveData = Boolean(connection?.saveData);
  const slowNet = connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g";
  const mobile = window.matchMedia("(max-width: 768px)").matches || /Mobi|Android/i.test(navigator.userAgent);

  if (saveData || slowNet || cores <= 4 || memory <= 4 || mobile) {
    return cores <= 2 || memory <= 2 ? "low" : "medium";
  }

  return "high";
}

export function supportsWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}
