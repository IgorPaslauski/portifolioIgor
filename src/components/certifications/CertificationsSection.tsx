import { useEffect, useState } from "react";
import { CertificateDto } from "@/lib/entities/CertificateDto";

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState<CertificateDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + "/certifications.json")
      .then((response) => response.json())
      .then((data: CertificateDto[]) => setCertifications(data))
      .catch((error) => console.error("Error fetching certifications:", error))
      .finally(() => setLoading(false));
  }, []);

  const featured = certifications.find((item) => item.id === 2) ?? certifications[0];
  const rest = certifications.filter((item) => item.id !== featured?.id);

  return (
    <section id="certifications" aria-busy={loading} className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12">
      <div className="mb-10 flex items-end justify-between gap-6">
        <h2 className="text-4xl sm:text-5xl">Certificações</h2>
        <p className="hidden max-w-xs text-right text-sm text-muted-foreground sm:block">
          Formação complementar. Todos os certificados continuam acessíveis.
        </p>
      </div>
      {loading && <p className="sr-only">Carregando certificações</p>}
      <div className="min-h-[16rem]">
        {loading ? (
          <div className="h-40 border-t border-border" />
        ) : (
          <>
            {featured && (
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-3 border-t border-foreground/20 py-8 lg:grid-cols-12"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal lg:col-span-3">
                  {featured.issuer} · {featured.date}
                </p>
                <p className="font-display text-2xl font-bold leading-tight group-hover:text-signal lg:col-span-9 lg:text-3xl">
                  {featured.title}
                </p>
              </a>
            )}
            <ul>
              {rest.map((item) => (
                <li key={item.id} className="border-t border-border">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid gap-1 py-4 transition-colors hover:text-signal sm:grid-cols-12 sm:items-baseline"
                  >
                    <span className="font-mono text-xs text-muted-foreground sm:col-span-3">
                      {item.issuer} · {item.date}
                    </span>
                    <span className="sm:col-span-9">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;
