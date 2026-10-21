import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div>
        <p className="mb-3 font-sans text-xs font-medium tracking-[0.22em] text-signal">404</p>
        <h1 className="mb-4 text-foreground">Página não encontrada</h1>
        <a href="/" className="text-sm text-foreground underline decoration-signal underline-offset-4">
          Voltar ao início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
