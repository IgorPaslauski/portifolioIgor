export function FallbackBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink" aria-hidden>
      <div className="page-grid absolute inset-0 opacity-70" />
      <div className="absolute left-1/2 top-[18%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-ember/15 blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-paper/5 blur-[120px]" />
    </div>
  );
}
