import { Badge } from "../ui/badge";

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
  role,
  company,
  description,
  period,
  achievements,
  technologies,
}: ExperienceCardProps) => {
  return (
    <article className="grid gap-4 border-b border-border py-8 md:grid-cols-12">
      <p className="text-sm text-signal md:col-span-3">{period}</p>
      <div className="md:col-span-9">
        <h3 className="text-foreground">{role}</h3>
        <p className="mt-1 text-muted-foreground">{company}</p>
        <p className="mt-4 text-muted-foreground">{description}</p>
        <h4 className="mb-2 mt-6 font-sans text-sm font-medium text-foreground">Conquistas principais</h4>
        <ul className="space-y-2 text-muted-foreground">
          {achievements.map((achievement) => (
            <li key={achievement} className="border-l border-signal pl-4">
              {achievement}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-none text-foreground">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ExperienceCard;
