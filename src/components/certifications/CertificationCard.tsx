import { Award, Calendar, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export interface CertificationProps {
  id: number;
  title: string;
  issuer: string;
  description: string;
  date: string;
  link: string;
}
const CertificationCard = ({
  id,
  title,
  issuer,
  description,
  date,
  link,
}: CertificationProps) => {
  return (
    <Card key={id} className="card-hover bg-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl text-foreground">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">{issuer}</CardDescription>
          </div>
          <Award className="h-8 w-8 text-primary dark:text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{date}</span>
          </div>
          <a
            href={link}
            className="text-primary flex items-center text-sm hover:text-primary/80 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver certificado
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificationCard;
