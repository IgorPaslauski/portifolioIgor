import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import ExperienceCard from "./ExperienceCard";
import { ExperienceDto } from "@/lib/entities/ExperienceDto";
import ExperienceCardSkeleton from "./ExperienceCardSkeleton";

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + "/experiences.json")
      .then((response) => response.json())
      .then((data) => {
        setExperiences(data);
      })
      .catch((error) => console.error("Error fetching experiences:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section id="experience" className="bg-secondary/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Minha <span className="gradient-text">Experiência</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Minha trajetória profissional como desenvolvedor e as empresas com
            as quais colaborei.
          </p>
        </div>

        <div className="space-y-8">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, index) => <ExperienceCardSkeleton key={index} />)
            : experiences.map((experience: ExperienceDto) => (
                <ExperienceCard key={experience.id} {...experience} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
