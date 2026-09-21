import { profile } from "@/content";
import { Button } from "@/components/ui/button";

export function Opening() {
  return (
    <section
      id="boot"
      className="relative z-10 flex min-h-[100svh] flex-col justify-end px-gutter pb-16 pt-28 md:pb-20"
    >
      <div className="mx-auto flex w-full max-w-page flex-col gap-10">
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.28em] text-dust">
          <span>{profile.role}</span>
          <span>
            {profile.location} · {profile.years} anos
          </span>
        </div>

        <h1 className="font-display text-display-xl text-paper">
          {profile.lastName}
          <span className="text-ember">.</span>
        </h1>

        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <p className="max-w-xl font-body text-xl text-paper/80 md:col-span-7 md:text-2xl">
            {profile.headline} {profile.lede}
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <Button onClick={() => document.querySelector("#obras")?.scrollIntoView({ behavior: "smooth" })}>
              Ver as obras
            </Button>
            <a href={profile.cv} download="cv-igor-paslauski.pdf">
              <Button variant="line">Baixar CV</Button>
            </a>
          </div>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-dust">
          Role para atravessar o sistema
        </p>
      </div>
    </section>
  );
}
