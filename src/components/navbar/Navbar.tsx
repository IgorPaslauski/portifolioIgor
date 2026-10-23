import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { publicUrl } from "@/lib/publicUrl";

type NavItem = { id: string; label: string };

const PRIMARY = ["work", "lab", "engineering", "contact"];

const FALLBACK_NAVS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Trabalho" },
  { id: "lab", label: "Lab" },
  { id: "engineering", label: "Engineering" },
  { id: "contact", label: "Contato" },
];

/** Section whose top is closest above the spy line; last section wins near page end. */
function resolveActiveSection(ids: string[]): string {
  if (ids.length === 0) return "home";

  const scrollBottom = window.scrollY + window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  if (scrollBottom >= docHeight - 48) {
    return ids[ids.length - 1];
  }

  const spy = window.scrollY + Math.min(120, window.innerHeight * 0.22);
  let current = ids[0];

  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= spy + 1) current = id;
  }

  return current;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [navs, setNavs] = useState<NavItem[]>(FALLBACK_NAVS);
  const [loading, setLoading] = useState(true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    setActiveId(id);
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
    fetch(publicUrl("navs.json"))
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data: NavItem[]) => {
        if (Array.isArray(data) && data.some((n) => n.id === "engineering")) {
          setNavs(data);
        } else {
          setNavs(FALLBACK_NAVS);
        }
      })
      .catch(() => setNavs(FALLBACK_NAVS))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onScrollChrome = () => setScrolled(window.scrollY > 12);
    onScrollChrome();
    window.addEventListener("scroll", onScrollChrome, { passive: true });
    return () => window.removeEventListener("scroll", onScrollChrome);
  }, []);

  useEffect(() => {
    if (navs.length === 0) return;
    const ids = navs.map((nav) => nav.id);

    const update = () => {
      const hash = window.location.hash.replace(/^#/, "");
      // Honor hash only at the very top (fresh load / jump); otherwise scroll position wins.
      if (hash && ids.includes(hash) && window.scrollY < 8) {
        setActiveId(hash);
        return;
      }
      setActiveId(resolveActiveSection(ids));
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
      window.removeEventListener("resize", update);
    };
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
              ? Array.from({ length: 4 }, (_, index) => (
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
            <button
              ref={menuButtonRef}
              type="button"
              className="grid h-10 w-10 place-items-center border border-foreground/20 lg:hidden"
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
            {navs.map((nav, index) => (
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
