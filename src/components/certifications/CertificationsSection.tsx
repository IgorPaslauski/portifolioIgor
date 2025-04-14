import { useEffect, useState } from "react";
import CertificationCard from "./CertificationCard";
import { CertificateDto } from "@/lib/entities/CertificateDto";
import { CertificationCardSkeleton } from "./CertificationCardSkeleton";

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState<CertificateDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + "/certifications.json")
      .then((response) => response.json())
      .then((data: CertificateDto[]) => {
        setCertifications(data);
      })
      .catch((error) => console.error("Error fetching certifications:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section id="certifications">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Minhas <span className="gradient-text">Certificações</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Certificações e cursos especializados que complementam minha
            formação e experiência profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, index) => <CertificationCardSkeleton key={index} />)
            : certifications.map((certification: CertificateDto) => (
                <CertificationCard key={certification.id} {...certification} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
