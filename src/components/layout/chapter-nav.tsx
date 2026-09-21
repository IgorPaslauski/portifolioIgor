import { chapters } from "@/content";
import { cn } from "@/lib/utils";
import { useExperience } from "@/hooks/use-experience";
import { useState } from "react";

export function ChapterNav() {
  const { chapter } = useExperience();
  const [open, setOpen] = useState(false);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between px-gutter pt-5">
        <a
          href="#boot"
          className="pointer-events-auto font-mono text-[11px] uppercase tracking-[0.32em] text-paper/80 transition-colors hover:text-ember"
        >
          Paslauski
        </a>
        <button
          type="button"
          className="pointer-events-auto font-mono text-[11px] uppercase tracking-[0.28em] text-dust md:hidden"
          aria-expanded={open}
          aria-controls="chapter-index"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Fechar" : "Índice"}
        </button>
      </header>

      <nav
        id="chapter-index"
        aria-label="Capítulos"
        className={cn(
          "fixed right-0 top-0 z-40 flex h-full w-[min(18rem,80vw)] flex-col justify-center gap-2 border-l border-paper/10 bg-ink/95 px-6 py-20 backdrop-blur-sm transition-transform duration-500 ease-editorial md:w-auto md:border-0 md:bg-transparent md:px-5 md:py-0 md:backdrop-blur-0 lg:px-7",
          open
            ? "pointer-events-auto translate-x-0"
            : "pointer-events-none translate-x-full md:pointer-events-auto md:translate-x-0",
        )}
      >
        {chapters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => go(item.href)}
            className={cn(
              "group flex items-baseline gap-3 text-left font-mono text-[11px] uppercase tracking-[0.22em] transition-colors",
              chapter === item.id ? "text-ember" : "text-dust hover:text-paper",
            )}
            aria-current={chapter === item.id ? "true" : undefined}
          >
            <span>{item.index}</span>
            <span className={cn("md:max-w-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-300", "md:group-hover:max-w-[8rem] md:group-hover:opacity-100", chapter === item.id && "md:max-w-[8rem] md:opacity-100")}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </>
  );
}
