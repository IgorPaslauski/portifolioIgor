import { profile } from "@/content";

export function Signal() {
  return (
    <section id="sinal" className="relative z-10 px-gutter py-28 md:py-36">
      <div className="mx-auto grid max-w-page gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember">01 · Sinal</p>
          <h2 className="mt-4 font-display text-display-md text-paper">
            Não sou um template de desenvolvedor.
          </h2>
        </div>

        <div className="space-y-6 font-body text-lg leading-relaxed text-paper/80 lg:col-span-8 lg:pt-12">
          <p>
            Me chamo {profile.fullName}. Moro em {profile.location}, estudo {profile.education} e
            trabalho com software desde 2021 — o tempo suficiente para desconfiar de demo e
            respeitar sistema legado.
          </p>
          <p>
            De dia, o ofício é contábil, fiscal, ERP. Código que conversa com prefeitura, Receita,
            estoque e gente que não pode ficar olhando uma barra de progresso. De noite, o ofício
            muda de dialeto: lexer, AST, language server, uma linguagem que fala em meme.
          </p>
          <p>
            Gosto de pitch, evento de tecnologia e projeto aberto. Mais do que isso, gosto de
            deixar o próximo desenvolvedor menos perdido do que eu estive.
          </p>
        </div>

        <figure className="lg:col-span-5">
          <div className="relative overflow-hidden border border-paper/10">
            <img
              src={profile.photo}
              alt={`${profile.fullName}, ${profile.role}`}
              width={720}
              height={900}
              className="aspect-[4/5] w-full object-cover grayscale transition duration-700 ease-editorial hover:grayscale-0"
            />
          </div>
          <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-dust">
            {profile.firstName} · Ijuí · remoto
          </figcaption>
        </figure>

        <dl className="grid gap-8 sm:grid-cols-3 lg:col-span-7 lg:content-end">
          <Stat label="Em produção" value={profile.years} detail="anos de sistema real" />
          <Stat label="Formação" value="CC" detail="UNIJUÍ, em curso" />
          <Stat label="Modo" value="Full stack" detail="do banco à interface" />
        </dl>
      </div>
    </section>
  );
}

function Stat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="border-t border-paper/15 pt-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-dust">{label}</dt>
      <dd className="mt-2 font-display text-4xl text-paper">{value}</dd>
      <p className="mt-1 text-sm text-paper/60">{detail}</p>
    </div>
  );
}
