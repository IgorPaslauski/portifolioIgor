import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

type NavItem = { id: string; label: string };

const PRIMARY = ["projects", "experience", "contact"];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [navs, setNavs] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    if (!isMenuOpen) return;
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  const onAnchor = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToSection(id);
  };

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + "/navs.json")
      .then((response) => response.json())
      .then((data: NavItem[]) => setNavs(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (navs.length === 0) return;
    const elements = navs
      .map((nav) => document.getElementById(nav.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.15, 0.4] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [navs]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const primary = navs.filter((nav) => PRIMARY.includes(nav.id));

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || isMenuOpen ? "bg-background" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a
          href="#home"
          onClick={(event) => onAnchor(event, "home")}
          className="font-display text-2xl font-extrabold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
        >
          Ígor
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Atalhos">
          {loading
            ? Array.from({ length: 3 }, (_, index) => (
                <span key={index} className="h-3 w-16 bg-muted" />
              ))
            : primary.map((nav) => (
                <a
                  key={nav.id}
                  href={`#${nav.id}`}
                  onClick={(event) => onAnchor(event, nav.id)}
                  aria-current={activeId === nav.id ? "true" : undefined}
                  className={`text-sm tracking-wide underline-offset-[6px] decoration-signal decoration-2 motion-safe:transition-colors hover:text-signal hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal ${
                    activeId === nav.id ? "text-foreground underline" : "text-foreground/75"
                  }`}
                >
                  {nav.label}
                </a>
              ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="grid h-10 w-10 place-items-center border border-foreground/20"
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

    </header>
      {isMenuOpen && (
        <div
          id="site-menu"
          ref={menuRef}
          className="fixed inset-0 z-40 overflow-y-auto bg-background px-5 pb-10 pt-24 sm:px-10"
        >
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">Índice</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {loading
              ? Array.from({ length: 8 }, (_, index) => <span key={index} className="h-12 bg-muted" />)
              : navs.map((nav, index) => (
                  <a
                    key={nav.id}
                    href={`#${nav.id}`}
                    onClick={(event) => onAnchor(event, nav.id)}
                    aria-current={activeId === nav.id ? "true" : undefined}
                    className="flex items-baseline gap-4 border-b border-border py-3 text-left motion-safe:transition-colors hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-4xl font-bold sm:text-5xl">{nav.label}</span>
                  </a>
                ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
