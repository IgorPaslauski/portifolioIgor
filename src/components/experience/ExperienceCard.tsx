import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export interface ExperienceCardProps {
  id: number;
  role: string;
  company: string;
  description: string;
  period: string;
  achievements: string[];
  technologies: string[];
}
const ExperienceCard = ({
  id,
  role,
  company,
  description,
  period,
  achievements,
  technologies,
}: ExperienceCardProps) => {
  return (
    <Card key={id} className="card-hover">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl">{role}</CardTitle>
            <CardDescription className="text-lg font-medium">
              {company}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="w-fit text-portfolio-blue border-portfolio-blue"
          >
            {period}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{description}</p>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Conquistas Principais:</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
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
  );
};

export default ExperienceCard;
