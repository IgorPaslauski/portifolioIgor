import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "./contact/ContactForm";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Entre em <span className="gradient-text">Contato</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tem um projeto em mente ou quer conversar sobre oportunidades? Entre
            em contato comigo.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <Card className="card-hover h-full">
              <CardHeader>
                <CardTitle>Fale Comigo</CardTitle>
                <CardDescription>
                  Preencha o formulário e entrarei em contato o mais rápido
                  possível.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/2">
            <Card className="h-full bg-gradient-to-br from-portfolio-blue to-portfolio-dark-blue text-white">
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
                <CardDescription className="text-white/90">
                  Outras formas de entrar em contato comigo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-white/90">igor.paslauski123@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Telefone</h4>
                    <p className="text-white/90">+55 (55) 99731-1689</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Localização</h4>
                    <p className="text-white/90">Ijuí, RS - Brasil</p>
                    <p className="text-white/90 mt-1">
                      Disponível para trabalho remoto
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Disponibilidade</h4>
                  <p className="text-white/90">
                    Atualmente disponível para projetos freelance, consultoria e
                    oportunidades de trabalho full-time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
