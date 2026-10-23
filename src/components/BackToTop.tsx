import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      aria-label="Voltar ao topo"
      className={`fixed bottom-5 right-5 z-10 border border-border bg-background/90 p-2 text-foreground motion-safe:transition-opacity ${
        isVisible ? "opacity-60 hover:opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp />
    </button>
  );
}
