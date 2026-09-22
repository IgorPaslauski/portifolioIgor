import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [leave, setLeave] = useState(false);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLeave(true), 700);
    const hideTimer = window.setTimeout(() => setVisible(false), 1100);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center bg-ink transition-opacity duration-500",
        leave && "opacity-0",
      )}
      role="status"
      aria-live="polite"
    >
      <p className="text-[13px] tracking-[0.22em] text-paper/70">Paslauski</p>
    </div>
  );
}
