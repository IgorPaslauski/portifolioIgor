import { TokenCanvas } from "@/components/canvas/token-canvas";
import type { Project } from "@/content";
import { cn } from "@/lib/utils";

export function PuroSucoLab({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden bg-ink-50", compact ? "min-h-[22rem]" : "min-h-[28rem] lg:min-h-[34rem]")}>
      <TokenCanvas />
      <div className="relative z-10 grid gap-4 p-5 md:grid-cols-2 md:p-7">
        <pre className="code-panel font-mono text-[12px] leading-6 text-paper/85 md:text-[13px]">
          <span className="text-dust">01</span> <span className="text-ember">AMOSTRADINHO</span> conta{" "}
          <span className="text-ember">RECEBA</span> 10{"\n"}
          <span className="text-dust">02</span>{"\n"}
          <span className="text-dust">03</span> conta <span className="text-ember">RECEBA</span> conta + 1{"\n"}
          <span className="text-dust">04</span>{"\n"}
          <span className="text-dust">05</span> <span className="text-dust">// o meme é a operação</span>
          {"\n"}
          <span className="text-dust">06</span> public <span className="text-dust">→</span> AMOSTRADINHO{"\n"}
          <span className="text-dust">07</span> = <span className="text-dust">→</span> RECEBA
        </pre>
        <div className="space-y-4">
          <div className="code-panel font-mono text-[12px] leading-6 text-paper/80">
            <p className="text-dust">$ purosuco run conta.suco</p>
            <p className="mt-2">
              ok <span className="text-ember">·</span> 12 tokens <span className="text-ember">·</span> AST pronta
            </p>
            <p className="text-dust">transpilado → C#</p>
          </div>
          <svg viewBox="0 0 280 120" className="h-28 w-full text-paper" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="96" y="8" width="88" height="24" className="text-ember" />
              <rect x="20" y="56" width="72" height="22" />
              <rect x="104" y="56" width="72" height="22" />
              <rect x="188" y="56" width="72" height="22" />
              <path d="M140 32v24M56 56V44h84M216 56V44H140" className="text-paper/40" />
            </g>
            <text x="140" y="24" textAnchor="middle" fill="#ede6d6" fontSize="9" fontFamily="IBM Plex Mono, monospace">
              AST
            </text>
            <text x="56" y="71" textAnchor="middle" fill="#9A9184" fontSize="8" fontFamily="IBM Plex Mono, monospace">
              lexer
            </text>
            <text x="140" y="71" textAnchor="middle" fill="#9A9184" fontSize="8" fontFamily="IBM Plex Mono, monospace">
              parser
            </text>
            <text x="224" y="71" textAnchor="middle" fill="#9A9184" fontSize="8" fontFamily="IBM Plex Mono, monospace">
              emit
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function MetricBoard({
  from,
  to,
  caption,
}: {
  from: string;
  to: string;
  caption: string;
}) {
  return (
    <div className="relative overflow-hidden border-t border-paper/10 py-6">
      <p className="metric-display text-paper">
        {from} <span className="text-ember">→</span> {to}
      </p>
      <p className="mt-3 max-w-sm font-body text-paper/60">{caption}</p>
    </div>
  );
}

export function ContractDiagram() {
  return (
    <div className="grid gap-3 font-mono text-[11px] uppercase tracking-[0.16em] md:grid-cols-[1fr_auto_1fr]">
      <div className="border border-paper/15 px-4 py-5 text-paper/80">
        sistema contábil
        <p className="mt-2 normal-case tracking-normal text-paper/55">evento · payload · autenticação</p>
      </div>
      <div className="flex items-center justify-center text-ember">↔</div>
      <div className="border border-ember/50 px-4 py-5 text-paper">
        receita · REINF
        <p className="mt-2 normal-case tracking-normal text-paper/55">contrato rígido · falha explícita</p>
      </div>
    </div>
  );
}

export function VersionShift() {
  return (
    <div className="flex items-end gap-5">
      <span className="font-display text-[5.5rem] leading-none text-paper/25 line-through decoration-ember decoration-2 md:text-[7rem]">
        6
      </span>
      <span className="mb-4 font-mono text-[12px] uppercase tracking-[0.22em] text-ember">→</span>
      <span className="font-display text-[5.5rem] leading-none text-paper md:text-[7rem]">15</span>
    </div>
  );
}

export function ShotFrame({ project }: { project: Project }) {
  if (!project.image) return null;
  return (
    <figure className="overflow-hidden bg-ink-100">
      <img
        src={project.image}
        alt={`Captura de ${project.title}`}
        className="aspect-[16/10] w-full object-cover object-top opacity-90"
      />
    </figure>
  );
}
