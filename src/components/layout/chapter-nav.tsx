import { chapters } from "@/content";
import { cn } from "@/lib/utils";
import { useExperience } from "@/hooks/use-experience";
import { useEffect, useState } from "react";

export function ChapterNav() {
  const { chapter, progress } = useExperience();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > 80 && current > last);
      last = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-paper/10">
        <div className="h-full bg-ember transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </div>
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-gutter py-5 transition-transform duration-500 ease-editorial",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <a
          href="#boot"
          className="pointer-events-auto text-[13px] tracking-[0.18em] text-paper/90"
        >
          Paslauski
        </a>
        <nav className="pointer-events-auto hidden items-center gap-8 md:flex" aria-label="Seções">
          {chapters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.href)}
              className={cn(
                "text-[13px] text-dust transition-colors hover:text-paper",
                chapter === item.id && "text-paper",
              )}
              aria-current={chapter === item.id ? "true" : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          className="pointer-events-auto text-[13px] text-dust md:hidden"
          aria-expanded={open}
          aria-controls="chapter-index"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </header>

      <nav
        id="chapter-index"
        aria-label="Menu"
        className={cn(
          "fixed inset-0 z-30 flex flex-col justify-center gap-6 bg-ink px-gutter md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none hidden",
        )}
      >
        {chapters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => go(item.href)}
            className="text-left font-display text-4xl text-paper"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </>
  );
}
