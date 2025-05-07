import React, { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast({
                title: "Erro",
                description: "Por favor, preencha todos os campos.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("https://formsubmit.co/igor.paslauski123@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    _subject: `Novo contato: ${formData.subject}`,
                    _template: "table",
                    _captcha: "false"
                }),
            });

            if (response.ok) {
                toast({
                    title: "Sucesso",
                    description: "Mensagem enviada com sucesso! Obrigado por entrar em contato comigo. Retornarei em breve.",
                });
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                throw new Error(`Failed to send message: ${response.statusText}`);
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: `Falha ao enviar a mensagem: ${error.message}. Tente novamente.`,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                        Nome
                    </label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                    Assunto
                </label>
                <Input
                    id="subject"
                    name="subject"
                    placeholder="Qual o motivo do contato?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                    Mensagem
                </label>
                <Textarea
                    id="message"
                    name="message"
                    placeholder="Detalhe sua proposta ou mensagem aqui..."
                    className="min-h-[120px]"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
            </div>
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <Button
                type="submit"
                className="w-full bg-portfolio-blue hover:bg-portfolio-dark-blue"
                disabled={isSubmitting}
            >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </Button>
        </form>
    );
}