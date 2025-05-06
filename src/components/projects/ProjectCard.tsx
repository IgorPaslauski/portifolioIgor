import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ExternalLink, Github } from "lucide-react";

export interface ProjectProps {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink: string;
  repoLink: string;
}

const ProjectCard = ({
  id,
  image,
  title,
  description,
  tags,
  liveLink,
  repoLink,
}: ProjectProps) => {
  return (
    <Card key={id} className="overflow-hidden card-hover">
      <div className="h-48 overflow-hidden">
        <img
          src={import.meta.env.VITE_API_URL + image}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary/80"
          asChild
        >
          <a href={repoLink} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            Repo
          </a>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary/80"
          asChild
        >
          <a href={liveLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Demo
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
