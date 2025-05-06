import { useEffect, useState } from "react";
import { SkillDto } from "../../lib/entities/SkillDto";
import SkillCard from "./SkillCard";
import SkillCardSkeleton from "./SkillCardSkeleton";

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + "/skills.json")
      .then((response) => response.json())
      .then((data) => {
        setSkills(data);
      })
      .catch((error) => console.error("Error fetching skills:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section id="skills" className="bg-secondary/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Minhas <span className="gradient-text">Habilidades</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tecnologias e ferramentas com as quais tenho experiência e
            competência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, index) => <SkillCardSkeleton key={index} />)
            : skills.map((skill: SkillDto) => (
                <SkillCard key={skill.id} {...skill} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
