import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FallbackBackdrop } from "@/components/canvas/fallback";

export function NotFoundPage() {
  const location = useLocation();

  useEffect(() => {
    console.warn("404", location.pathname);
    document.title = "Página não encontrada — Paslauski";
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className="relative z-10 flex min-h-screen flex-col justify-center px-gutter">
      <FallbackBackdrop />
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">Erro 404</p>
      <h1 className="mt-4 font-display text-display-lg">Página não encontrada.</h1>
      <p className="mt-4 max-w-md font-body text-lg text-paper/70">
        Esse endereço não existe neste sistema. O índice continua na entrada.
      </p>
      <Link to="/" className="mt-8 inline-flex border border-ember px-5 py-2 text-sm uppercase tracking-[0.18em] text-ember">
        Voltar ao mapa
      </Link>
    </main>
  );
}
