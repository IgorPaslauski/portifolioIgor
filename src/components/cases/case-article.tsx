import { Link } from "react-router-dom";
import type { Project } from "@/content";
import { Button } from "@/components/ui/button";

export function CaseArticle({ project }: { project: Project }) {
  return (
    <article className="relative z-10 px-gutter pb-24 pt-28">
      <div className="mx-auto max-w-page">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ember">
          <Link to="/" className="hover:text-paper">
            Mapa
          </Link>
          <span aria-hidden> / </span>
          {project.kicker}
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-display-lg text-paper">{project.title}</h1>
        <p className="mt-6 max-w-2xl font-body text-xl text-paper/75">{project.summary}</p>

        <dl className="mt-10 grid gap-6 border-y border-paper/10 py-6 sm:grid-cols-3">
          <Meta label="Ano" value={project.year} />
          <Meta label="Tipo" value={project.kind === "interno" ? "Produto interno" : "Aberto"} />
          <Meta label="Stack" value={project.technologies.join(" · ")} />
        </dl>

        {project.image && (
          <figure className="mt-12 overflow-hidden border border-paper/10">
            <img src={project.image} alt={`Captura de ${project.title}`} className="w-full object-cover" />
          </figure>
        )}

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Block title="Problema" text={project.problem} />
          <Block title="Contexto" text={project.context} />
          <Block title="Participação" text={project.role} />
          <Block title="Resultado" text={project.result} />
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              <Button>Abrir o projeto</Button>
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              <Button variant="line">GitHub</Button>
            </a>
          )}
          <Link to="/#obras">
            <Button variant="ghost">Voltar às obras</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-dust">{label}</dt>
      <dd className="mt-2 text-paper">{value}</dd>
    </div>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <section className="lg:col-span-6">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">{title}</h2>
      <p className="mt-3 font-body text-lg leading-relaxed text-paper/80">{text}</p>
    </section>
  );
}
