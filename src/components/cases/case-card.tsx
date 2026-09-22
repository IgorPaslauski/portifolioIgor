import { Link } from "react-router-dom";
import type { Project } from "@/content";
import { cn } from "@/lib/utils";

export function CaseCard({
  project,
  index,
  onFocus,
}: {
  project: Project;
  index: number;
  onFocus: (slug: string | null) => void;
}) {
  return (
    <article
      className="group border-t border-paper/10 py-10"
      onMouseEnter={() => onFocus(project.slug)}
      onMouseLeave={() => onFocus(null)}
      onFocus={() => onFocus(project.slug)}
      onBlur={() => onFocus(null)}
    >
      <Link
        to={`/obra/${project.slug}`}
        className="grid items-end gap-6 md:grid-cols-12"
        aria-label={`Abrir case ${project.title}`}
      >
        <p className="text-[12px] uppercase tracking-[0.2em] text-dust md:col-span-2">
          {String(index + 1).padStart(2, "0")}
        </p>
        <div className="md:col-span-6">
          <p className="text-[12px] uppercase tracking-[0.2em] text-dust">
            {project.kicker} · {project.year}
          </p>
          <h3 className="mt-2 font-display text-4xl text-paper transition-colors group-hover:text-ember md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-xl font-body text-lg text-paper/70">{project.summary}</p>
        </div>
        <div className="flex flex-col items-start gap-3 md:col-span-4 md:items-end">
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.2em]",
              project.kind === "interno" ? "text-dust" : "text-paper/80",
            )}
          >
            {project.kind === "interno" ? "Produto interno" : "Aberto"}
          </span>
          <p className="text-right font-mono text-[11px] uppercase tracking-[0.16em] text-dust">
            {project.technologies.slice(0, 3).join(" · ")}
          </p>
          <span className="text-sm text-ember opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            Abrir o case →
          </span>
        </div>
      </Link>
    </article>
  );
}
