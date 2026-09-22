import { FormEvent, useState } from "react";
import { profile } from "@/content";
import { Button } from "@/components/ui/button";
import { SectionHandoff } from "@/components/layout/lab-frame";

export function Channel() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      subject: String(data.get("subject") || ""),
      message: String(data.get("message") || ""),
      _subject: `Novo contato: ${String(data.get("subject") || "")}`,
      _template: "table",
      _captcha: "false",
    };

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(`https://formsubmit.co/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("send");
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="canal" className="relative z-10">
      <SectionHandoff from="Caderno" to="Contato" />
      <div className="px-gutter py-24 md:py-32">
        <div className="mx-auto grid max-w-page gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[12px] uppercase tracking-[0.28em] text-dust">Contato</p>
            <h2 className="mt-4 font-display text-display-md text-paper">Se fizer sentido, escreva.</h2>
            <p className="mt-5 font-body text-lg text-paper/80">{profile.availability}</p>

            <ul className="mt-10 space-y-4 font-mono text-sm uppercase tracking-[0.14em] text-paper">
              <li>
                <a className="hover:text-ember" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </li>
              <li>
                <a className="hover:text-ember" href={`tel:${profile.phoneTel}`}>
                  {profile.phoneDisplay}
                </a>
              </li>
              <li>
                <a className="hover:text-ember" href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
              <li className="text-paper/70">{profile.location} · remoto</li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.2em]">
              <a className="text-paper/70 hover:text-ember" href={profile.socials.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="text-paper/70 hover:text-ember" href={profile.socials.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="text-paper/70 hover:text-ember" href={profile.socials.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a className="text-paper/70 hover:text-ember" href={profile.socials.medium} target="_blank" rel="noreferrer">
                Medium
              </a>
            </div>
          </div>

          <form
            className="space-y-6 border border-paper/15 bg-ink-50 p-6 md:p-8 lg:col-span-7"
            onSubmit={onSubmit}
            noValidate
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field id="name" label="Nome" autoComplete="name" />
              <Field id="email" label="Email" type="email" autoComplete="email" />
            </div>
            <Field id="subject" label="Assunto" />
            <Field id="message" label="Mensagem" textarea />
            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Enviando…" : "Abrir o canal"}
              </Button>
              <p className="text-sm text-paper/70" role="status" aria-live="polite">
                {status === "ok" && "Chegou. Respondo em breve."}
                {status === "error" && "Não foi agora. Tente de novo ou mande um email direto."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  textarea,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const shared =
    "w-full border-b border-paper/35 bg-transparent py-3 text-paper outline-none transition-colors placeholder:text-dust/50 focus:border-ember";

  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/70">{label}</span>
      {textarea ? (
        <textarea id={id} name={id} rows={5} required className={shared} />
      ) : (
        <input id={id} name={id} type={type} required autoComplete={autoComplete} className={shared} />
      )}
    </label>
  );
}
