import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact">
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
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nome
                      </label>
                      <Input id="name" placeholder="Seu nome completo" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu.email@exemplo.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Assunto
                    </label>
                    <Input
                      id="subject"
                      placeholder="Qual o motivo do contato?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Mensagem
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Detalhe sua proposta ou mensagem aqui..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button className="w-full bg-portfolio-blue hover:bg-portfolio-dark-blue">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                </form>
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
