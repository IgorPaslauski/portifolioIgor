import { useEffect, useState } from "react";
import { ExperienceDto } from "@/lib/entities/ExperienceDto";

const isMeasured = (text: string) => /2 hrs|3 minutos|2 minutos/i.test(text);

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<ExperienceDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + "/experiences.json")
      .then((response) => response.json())
      .then((data: ExperienceDto[]) => setExperiences(data))
      .catch((error) => console.error("Error fetching experiences:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" aria-busy={loading} className="scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mb-16 grid gap-6 lg:grid-cols-12">
        <h2 className="lg:col-span-7">Trajetória</h2>
        <p className="text-muted-foreground lg:col-span-4 lg:col-start-9 lg:pt-4">
          Sistemas de gestão na Tecnicon e o sistema contábil na Abase. Os resultados abaixo estão nos registros originais.
        </p>
      </div>
      {loading && <p className="sr-only">Carregando experiência</p>}
      <div className="min-h-[28rem] space-y-20">
        {loading
          ? Array.from({ length: 2 }, (_, index) => <div key={index} className="h-48 border-t border-border" />)
          : experiences.map((job) => {
              const measured = job.achievements.filter(isMeasured);
              const rest = job.achievements.filter((item) => !isMeasured(item));
              return (
                <article key={job.id} className="grid gap-8 border-t border-foreground/15 pt-8 lg:grid-cols-12">
                  <div className="lg:col-span-3">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal">{job.period}</p>
                    <p className="mt-4 text-sm text-muted-foreground">{job.role}</p>
                  </div>
                  <div className="lg:col-span-9">
                    <h3 className="text-4xl sm:text-5xl">{job.company}</h3>
                    <p className="mt-4 max-w-3xl text-muted-foreground">{job.description}</p>
                    {measured.length > 0 && (
                      <div className="mt-8 space-y-4">
                        {measured.map((item) => (
                          <p key={item} className="max-w-4xl font-display text-2xl font-bold leading-snug sm:text-3xl">
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                    <ul className="mt-8 max-w-3xl space-y-3">
                      {rest.map((item) => (
                        <li key={item} className="border-l border-signal pl-4 text-foreground/90">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {job.technologies.join(" · ")}
                    </p>
                  </div>
                </article>
              );
            })}
      </div>
    </section>
  );
};

export default ExperienceSection;
