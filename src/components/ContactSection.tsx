import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "./contact/ContactForm";

const socials = [
  { href: "https://github.com/IgorPaslauski", label: "GitHub" },
  { href: "https://www.linkedin.com/in/igor-paslauski-de-oliveira/", label: "LinkedIn" },
  { href: "https://www.instagram.com/igor_paslauski/", label: "Instagram" },
  { href: "mailto:igor.paslauski123@gmail.com", label: "Email" },
];

const ContactSection = () => {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="scroll-mt-24 bg-foreground px-5 py-24 text-background sm:px-8 lg:px-12 lg:py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">Contato</p>
      <h2 className="mt-6 max-w-5xl text-background">
        Tem um projeto em mente?
      </h2>
      <a
        href="mailto:igor.paslauski123@gmail.com"
        className="mt-6 inline-block font-display text-2xl font-bold text-signal underline decoration-signal/40 underline-offset-4 sm:text-4xl"
      >
        igor.paslauski123@gmail.com
      </a>

      <div className="mt-16 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="mb-8 max-w-md text-background/70">
            Preencha o formulário e entrarei em contato o mais rápido possível.
          </p>
          <div className="[&_label]:text-background/50 [&_input]:text-background [&_textarea]:text-background [&_input]:placeholder:text-background/35 [&_textarea]:placeholder:text-background/35">
            <ContactForm />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-10 lg:col-span-5 lg:col-start-8">
          <ul className="space-y-5 text-background/80">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-signal" />
              <a href="https://wa.me/5555997311689" className="hover:text-signal">+55 (55) 99731-1689</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-signal" />
              <span>igor.paslauski123@gmail.com</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-signal" />
              <span>Ijuí, RS — Brasil · disponível para trabalho remoto</span>
            </li>
          </ul>
          <p className="max-w-sm text-background/70">
            Atualmente disponível para projetos freelance, consultoria e oportunidades de trabalho full-time.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-[0.16em] hover:text-signal">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-20 flex flex-col gap-3 border-t border-background/15 pt-6 text-sm text-background/50 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-xl font-bold text-background">Ígor Paslauski</p>
        <p>© {year} · Desenvolvedor full stack</p>
        <div className="flex gap-3">
          <a href="https://github.com/IgorPaslauski" aria-label="GitHub" className="hover:text-signal"><Github className="h-4 w-4" /></a>
          <a href="https://www.linkedin.com/in/igor-paslauski-de-oliveira/" aria-label="LinkedIn" className="hover:text-signal"><Linkedin className="h-4 w-4" /></a>
          <a href="https://www.instagram.com/igor_paslauski/" aria-label="Instagram" className="hover:text-signal"><Instagram className="h-4 w-4" /></a>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
