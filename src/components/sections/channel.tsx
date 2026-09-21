import { FormEvent, useState } from "react";
import { profile } from "@/content";
import { Button } from "@/components/ui/button";

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
    <section id="canal" className="relative z-10 px-gutter py-28 md:py-36">
      <div className="mx-auto grid max-w-page gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">06 · Canal</p>
          <h2 className="mt-4 font-display text-display-md text-paper">Se fizer sentido, escreva.</h2>
          <p className="mt-5 font-body text-lg text-paper/75">{profile.availability}</p>

          <ul className="mt-10 space-y-4 font-mono text-sm uppercase tracking-[0.14em] text-paper/80">
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
            <li>
              {profile.location} · remoto
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.2em]">
            <a className="text-dust hover:text-ember" href={profile.socials.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="text-dust hover:text-ember" href={profile.socials.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="text-dust hover:text-ember" href={profile.socials.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="text-dust hover:text-ember" href={profile.socials.medium} target="_blank" rel="noreferrer">
              Medium
            </a>
          </div>
        </div>

        <form
          className="space-y-5 border border-paper/10 bg-ink-50 p-6 md:p-8 lg:col-span-7"
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
            {status === "ok" && <p className="text-sm text-paper/70">Chegou. Respondo em breve.</p>}
            {status === "error" && (
              <p className="text-sm text-ember">Não foi agora. Tente de novo ou mande um email direto.</p>
            )}
          </div>
        </form>
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
    "w-full border-b border-paper/20 bg-transparent py-3 text-paper outline-none transition-colors placeholder:text-dust/50 focus:border-ember";

  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-dust">{label}</span>
      {textarea ? (
        <textarea id={id} name={id} rows={5} required className={shared} />
      ) : (
        <input id={id} name={id} type={type} required autoComplete={autoComplete} className={shared} />
      )}
    </label>
  );
}
