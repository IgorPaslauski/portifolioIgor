import { profile } from "@/content";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-paper/10 px-gutter py-8">
      <div className="mx-auto flex max-w-page flex-col gap-4 text-dust md:flex-row md:items-end md:justify-between">
        <p className="text-[13px] text-dust">
          © {new Date().getFullYear()} {profile.fullName}
        </p>
        <p className="max-w-sm text-sm text-paper/60">
          Ijuí, RS. Sistemas em produção, código revisado, curiosidade com horário de expediente.
        </p>
      </div>
    </footer>
  );
}
