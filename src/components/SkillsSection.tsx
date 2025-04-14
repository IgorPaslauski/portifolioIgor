import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const SkillsSection = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/skills.json")
      .then((response) => response.json())
      .then((data) => {
        setSkillCategories(data);
      })
      .catch((error) => console.error("Error fetching skills:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if(loading) {
    return (
      <section id="skills" className="bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">
              Minhas <span className="gradient-text">Habilidades</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-pulse bg-gray-200 rounded h-6 w-1/2"></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Card
                  key={index}
                  className="card-hover animate-pulse bg-gray-200 rounded h-48"
                ></Card>
              ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="bg-secondary/50">
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
          {skillCategories.map((category) => (
            <Card key={category.id} className="card-hover">
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
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

export default SkillsSection;
