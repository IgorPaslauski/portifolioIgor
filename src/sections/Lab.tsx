import { useEffect, useMemo, useState } from "react";
import { ProjectDto } from "@/lib/entities/ProjectDto";
import Reveal from "@/components/editorial/Reveal";
import { publicUrl } from "@/lib/publicUrl";

const FEATURED_IDS = new Set([3, 4, 11]); // Layout+, PuroSuco, Fire Sim — live in Selected Work

type PostDto = {
  id: string;
  title: string;
  description: string;
  pubDate: string;
  link: string;
  categories: string[];
};

function summarize(html: string, title: string) {
  const text = html
    .replace(/<figcaption[\s\S]*?<\/figcaption>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
  let body = text;
  const heading = title.replace(/\s+/g, " ").trim();
  if (heading && body.toLowerCase().startsWith(heading.toLowerCase())) {
    body = body.slice(heading.length).replace(/^[\s|:–—-]+/, "").trim();
  }
  if (!body) body = text;
  const slice = body.slice(0, 140);
  return `${slice.replace(/[,:;]\s*$/, "").trim()}…`;
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal";

/**
 * Lab — dense technical archive + Medium.
 * Distinct from Selected Work: discovery / navigation, not full-bleed cases.
 */
export default function Lab() {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let cancelled = false;
    setProjectsLoading(true);
    setProjectsError(null);

    fetch(publicUrl("projects.json"))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data: ProjectDto[]) => {
        if (cancelled) return;
        if (!Array.isArray(data)) {
          throw new Error("invalid payload");
        }
        setProjects(data);
      })
      .catch(() => {
        if (cancelled) return;
        setProjects([]);
        setProjectsError("Arquivo indisponível no momento.");
      })
      .finally(() => {
        if (!cancelled) setProjectsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    // External proxy — not controlled by this app; Cloudflare/CORS can fail.
    const url =
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@igor.pedroso123";

    fetch(url)
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data.status !== "ok") throw new Error("rss");
        const items: PostDto[] = (data.items || []).map(
          (item: {
            guid?: string;
            link?: string;
            title?: string;
            description?: string;
            pubDate?: string;
            categories?: string[];
          }) => ({
            id: item.guid || item.link || crypto.randomUUID(),
            title: item.title || "Sem título",
            description: item.description
              ? summarize(item.description, item.title || "")
              : "",
            pubDate: item.pubDate
              ? new Date(item.pubDate).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "",
            link: item.link || "#",
            categories: item.categories || [],
          })
        );
        setPosts(items);
        setPostsError(null);
      })
      .catch(() => {
        if (cancelled) return;
        setPosts([]);
        setPostsError("Artigos indisponíveis no momento. Abra o Medium pelo link abaixo.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const archive = useMemo(() => {
    const rest = projects.filter((p) => !FEATURED_IDS.has(p.id));
    const q = filter.trim().toLowerCase();
    if (!q) return rest;
    return rest.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [projects, filter]);

  return (
    <section id="lab" className="relative z-10 scroll-mt-24 border-t border-border px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <Reveal>
        <div className="mb-14 max-w-2xl lg:mb-20">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
            03 · Lab
          </p>
          <h2 className="text-[clamp(2rem,3.5vw,3.25rem)] font-medium tracking-[-0.02em] leading-[1.05]">
            Experimentos, arquivo e notas técnicas.
          </h2>
          <p className="mt-5 max-w-md text-foreground/70">
            Densidade para descoberta — não os cases full-bleed do Selected Work. Links e
            demos preservados do arquivo público.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Arquivo
            </p>
            <label className="sr-only" htmlFor="lab-filter">
              Filtrar arquivo
            </label>
            <input
              id="lab-filter"
              type="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filtrar por nome ou stack"
              disabled={Boolean(projectsError) || projectsLoading}
              className={`w-full max-w-xs border border-border bg-transparent px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 disabled:opacity-50 ${focusRing}`}
            />
          </div>

          {projectsLoading ? (
            <p className="font-mono text-xs text-muted-foreground">Carregando arquivo…</p>
          ) : projectsError ? (
            <p className="border border-border px-4 py-6 text-sm text-muted-foreground" role="alert">
              {projectsError}
            </p>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {archive.map((project) => (
                <li key={project.id} className="py-4 sm:py-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <p className="font-medium tracking-tight">{project.title}</p>
                      <p className="mt-1 text-sm text-foreground/65">{project.description}</p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {project.tags.join(" · ")}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-3 font-mono text-[11px] uppercase tracking-[0.14em]">
                      {project.repoLink && (
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-signal hover:underline ${focusRing}`}
                        >
                          Repo
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-foreground/80 hover:text-signal hover:underline ${focusRing}`}
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
              {archive.length === 0 && (
                <li className="py-6 font-mono text-xs text-muted-foreground">
                  {filter.trim()
                    ? "Nenhum item para este filtro."
                    : "Nenhum projeto no arquivo."}
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Artigos · Medium
          </p>
          {postsError && (
            <p className="text-sm text-muted-foreground">{postsError}</p>
          )}
          <ul className="space-y-6">
            {posts.slice(0, 8).map((post) => (
              <li key={post.id}>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block ${focusRing}`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {post.pubDate}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug tracking-tight group-hover:text-signal">
                    {post.title}
                  </p>
                  {post.description && (
                    <p className="mt-1 text-xs leading-relaxed text-foreground/55">
                      {post.description}
                    </p>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://medium.com/@igor.pedroso123"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-signal hover:underline ${focusRing}`}
          >
            Ver no Medium
          </a>
        </div>
      </div>

      <p className="mt-16 max-w-xl text-xs text-muted-foreground">
        Os cases PuroSuco, Layout+ e Fire Sim estão no Selected Work. Íris Pública permanece
        reservada até material autorizado.
      </p>
    </section>
  );
}
