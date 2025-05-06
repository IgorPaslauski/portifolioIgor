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
    <Card key={id} className="card-hover bg-card">
    <CardHeader>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <CardTitle className="text-2xl text-foreground">{role}</CardTitle>
          <CardDescription className="text-lg font-medium text-muted-foreground">
            {company}
          </CardDescription>
        </div>
        <Badge
          variant="outline"
          className="w-fit text-primary border-primary dark:text-primary dark:border-primary"
        >
          {period}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground mb-4">{description}</p>

      <div className="mb-4">
        <h4 className="font-semibold mb-2 text-foreground">Conquistas Principais:</h4>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
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
            className="bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary"
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
