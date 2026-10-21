import { useEffect, useState } from "react";
import { SkillDto } from "../../lib/entities/SkillDto";

const LABELS: Record<string, string> = {
  frontend: "Frontend Engineering",
  backend: "Backend & Architecture",
  database: "Data & Databases",
  tools: "Cloud, DevOps & Tooling",
};

const ORDER = ["backend", "frontend", "database", "tools"];

const rank = (id: string) => {
  const index = ORDER.indexOf(id);
  return index === -1 ? ORDER.length : index;
};

export default function SkillsSection() {
  const [skills, setSkills] = useState<SkillDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/skills.json`);
        if (!res.ok) throw new Error("fail");
        const data: SkillDto[] = await res.json();
        setSkills([...data].sort((a, b) => rank(a.id) - rank(b.id)));
      } catch {
        setError("Não foi possível carregar as habilidades.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="skills" aria-busy={loading} className="scroll-mt-24 border-y border-foreground/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mb-14 max-w-3xl">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-signal">Especialidades</p>
        <h2>O que eu construo.</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Interfaces, APIs, dados e implantação. As ferramentas aparecem dentro de cada prática.
        </p>
      </div>
      {loading && <p className="sr-only">Carregando habilidades</p>}
      <div className="min-h-[24rem]">
        {loading ? (
          Array.from({ length: 4 }, (_, index) => <div key={index} className="h-24 border-t border-border" />)
        ) : error ? (
          <p role="alert" className="text-destructive">{error}</p>
        ) : (
          skills.map((group, index) => {
              const names = [...group.skills].sort((a, b) => b.level - a.level).map((skill) => skill.name);
              return (
                <div
                  key={group.id}
                  className="grid gap-3 border-t border-foreground/15 py-8 last:border-b lg:grid-cols-12 lg:gap-8"
                >
                  <p className="font-mono text-xs text-muted-foreground lg:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="lg:col-span-4">
                    <h3 className="font-display text-3xl font-bold lg:text-4xl">{LABELS[group.id] ?? group.title}</h3>
                    <p className="mt-3 text-muted-foreground">{group.description}</p>
                  </div>
                  <p className="text-lg leading-relaxed lg:col-span-7 lg:pt-2">{names.join("  ·  ")}</p>
                </div>
              );
            })
        )}
      </div>
    </section>
  );
}
