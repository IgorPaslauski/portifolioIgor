import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [leave, setLeave] = useState(false);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLeave(true), 900);
    const hideTimer = window.setTimeout(() => setVisible(false), 1400);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] flex items-end justify-between bg-ink px-gutter py-10 transition-opacity duration-500",
        leave && "opacity-0",
      )}
      role="status"
      aria-live="polite"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-dust">Compilando o mapa-fonte</p>
      <p className="font-display text-4xl text-paper">IP</p>
    </div>
  );
}
