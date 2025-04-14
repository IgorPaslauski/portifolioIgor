import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, Calendar, ExternalLink } from "lucide-react";

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("/portifolioIgor/certifications.json")
      .then((response) => response.json())
      .then((data) => {
        setCertifications(data);
      })
      .catch((error) => console.error("Error fetching certifications:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="certifications">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              Minhas <span className="gradient-text">Certificações</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-pulse bg-gray-200 rounded h-6 w-1/2"></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="card-hover animate-pulse bg-gray-200 rounded h-48"></Card>
              ))}
          </div>
        </div>
      </section>
    );
  }

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
          {certifications.map((certification) => (
            <Card key={certification.id} className="card-hover">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">
                      {certification.title}
                    </CardTitle>
                    <CardDescription>{certification.issuer}</CardDescription>
                  </div>
                  <Award className="h-8 w-8 text-portfolio-blue" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  {certification.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{certification.date}</span>
                  </div>
                  <a
                    href={certification.link}
                    className="text-portfolio-blue flex items-center text-sm hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver certificado
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
