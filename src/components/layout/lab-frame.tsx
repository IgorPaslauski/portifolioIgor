export function LabFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="page-grid absolute inset-0 opacity-40" />
      <div className="absolute left-gutter top-0 hidden h-full w-px bg-paper/10 lg:block" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-paper/10" />
    </div>
  );
}

export function SectionHandoff({
  from,
  to,
  note,
}: {
  from: string;
  to: string;
  note?: string;
}) {
  return (
    <div className="relative z-10 px-gutter">
      <div className="mx-auto flex max-w-page items-end justify-between gap-6 border-t border-paper/10 py-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-dust">
          {from}
          <span className="mx-3 text-ember">→</span>
          {to}
        </p>
        {note && <p className="hidden max-w-sm text-right text-sm text-paper/45 md:block">{note}</p>}
      </div>
    </div>
  );
}
