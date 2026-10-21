import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const fieldClass =
  "h-12 rounded-none border-0 border-b border-background/30 bg-transparent px-0 text-background shadow-none placeholder:text-background/40 focus-visible:border-signal focus-visible:ring-0";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
          _captcha: "false",
        }),
      });

      if (response.ok) {
        toast({
          title: "Sucesso",
          description:
            "Mensagem enviada com sucesso! Obrigado por entrar em contato comigo. Retornarei em breve.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "erro desconhecido";
      toast({
        title: "Erro",
        description: `Falha ao enviar a mensagem: ${message}. Tente novamente.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-[0.18em] text-background/55">
            Nome
          </label>
          <Input id="name" name="name" placeholder="Seu nome completo" value={formData.name} onChange={handleChange} required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.18em] text-background/55">
            Email
          </label>
          <Input id="email" name="email" type="email" placeholder="seu.email@exemplo.com" value={formData.email} onChange={handleChange} required className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="font-mono text-[11px] uppercase tracking-[0.18em] text-background/55">
          Assunto
        </label>
        <Input id="subject" name="subject" placeholder="Qual o motivo do contato?" value={formData.subject} onChange={handleChange} required className={fieldClass} />
      </div>
      <div>
        <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-[0.18em] text-background/55">
          Mensagem
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Detalhe sua proposta ou mensagem aqui..."
          className={`${fieldClass} min-h-[140px] py-3`}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
