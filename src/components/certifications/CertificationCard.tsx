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
    <Card key={id} className="border-border bg-card shadow-none">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl text-foreground">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">{issuer}</CardDescription>
          </div>
          <Award className="h-6 w-6 text-signal" />
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
            className="inline-flex items-center text-sm text-foreground underline decoration-signal underline-offset-4"
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
