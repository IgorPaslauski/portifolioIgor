import { cn } from "@/lib/utils";

export function FallbackBackdrop({ contained = false }: { contained?: boolean }) {
  return (
    <div
      className={cn(
        "pointer-events-none overflow-hidden bg-ink",
        contained ? "absolute inset-0" : "fixed inset-0 -z-10",
      )}
      aria-hidden
    >
      <div className="page-grid absolute inset-0 opacity-50" />
      <div className="absolute left-1/2 top-[28%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-ember/10 blur-[120px]" />
    </div>
  );
}
