import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export interface SkillProps {
  id: string;
  title: string;
  description: string;
  skills: { name: string; level: number }[];
}

const SkillCard = ({ title, description, skills }: SkillProps) => {
  const ordered = [...skills].sort((a, b) => b.level - a.level);

  return (
    <Card className="border-border bg-card shadow-none">
      <CardHeader>
        <CardTitle className="font-sans text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
          {ordered.map((skill) => (
            <li key={skill.name} className="border-b border-border py-2 text-sm text-foreground">
              {skill.name}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
