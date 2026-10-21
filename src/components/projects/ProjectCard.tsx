import { useState } from "react";
import { Badge } from "../ui/badge";
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

const canTilt =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ProjectCard = ({ image, title, description, tags, liveLink, repoLink }: ProjectProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <article
      className="grid overflow-hidden border border-border bg-card md:grid-cols-12"
      style={
        canTilt
          ? { transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }
          : undefined
      }
      onPointerMove={(event) => {
        if (!canTilt) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: py * -4, y: px * 4 });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="aspect-[16/10] md:col-span-5 md:aspect-auto">
        <img
          src={import.meta.env.VITE_API_URL + image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between gap-6 p-6 md:col-span-7 md:p-8">
        <div>
          <h3 className="mb-3 text-foreground">{title}</h3>
          <p className="mb-4 text-muted-foreground">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-none text-foreground">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-6 text-sm">
          <a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-foreground underline decoration-signal underline-offset-4"
          >
            <Github className="mr-2 h-4 w-4" />
            Repo
          </a>
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-foreground underline decoration-signal underline-offset-4"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Demo
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
