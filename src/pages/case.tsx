import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, profile } from "@/content";
import { CaseArticle } from "@/components/cases/case-article";
import { FallbackBackdrop } from "@/components/canvas/fallback";

export function CasePage() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;

  useEffect(() => {
    const previous = document.title;
    document.title = project
      ? `${project.title} — ${profile.shortName}`
      : `Case não encontrado — ${profile.shortName}`;
    return () => {
      document.title = previous;
    };
  }, [project]);

  if (!project) {
    return (
      <main className="relative z-10 flex min-h-screen flex-col items-start justify-center px-gutter">
        <FallbackBackdrop />
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ember">404</p>
        <h1 className="mt-4 font-display text-display-md">Esse case não está no mapa.</h1>
        <Link to="/" className="mt-8 text-ember">
          Voltar
        </Link>
      </main>
    );
  }

  return (
    <>
      <FallbackBackdrop />
      <div className="page-grid pointer-events-none fixed inset-0 -z-10 opacity-35" aria-hidden />
      <header className="relative z-20 px-gutter pt-6">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-[0.32em] text-paper/80 hover:text-ember">
          Paslauski
        </Link>
      </header>
      <CaseArticle project={project} />
    </>
  );
}
