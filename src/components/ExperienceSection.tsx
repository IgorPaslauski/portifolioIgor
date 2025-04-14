import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ExperienceSection = () => {

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/portifolioIgor/experiences.json")
      .then((response) => response.json())
      .then((data) => {
        setExperiences(data);
      })
      .catch((error) => console.error("Error fetching experiences:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if(loading){
    return (
      <section id="experience" className="bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              Minha <span className="gradient-text">Experiência</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-pulse bg-gray-200 rounded h-6 w-1/2"></p>
          </div>

          <div className="space-y-8">
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
    <section id="experience" className="bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Minha <span className="gradient-text">Experiência</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Minha trajetória profissional como desenvolvedora e as empresas com
            as quais colaborei.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience) => (
            <Card key={experience.id} className="card-hover">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <CardTitle className="text-2xl">
                      {experience.role}
                    </CardTitle>
                    <CardDescription className="text-lg font-medium">
                      {experience.company}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="w-fit text-portfolio-blue border-portfolio-blue"
                  >
                    {experience.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{experience.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Conquistas Principais:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {experience.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-portfolio-light-blue/30 text-portfolio-blue"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
