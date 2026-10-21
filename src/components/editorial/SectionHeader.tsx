import Reveal from "./Reveal";

type SectionHeaderProps = {
  index: string;
  title: string;
  lede: string;
};

export default function SectionHeader({ index, title, lede }: SectionHeaderProps) {
  return (
    <Reveal>
    <header className="mb-12 max-w-2xl md:mb-16">
      <p className="mb-3 font-sans text-xs font-medium tracking-[0.22em] text-signal">
        {index}
      </p>
      <h2 className="mb-4 text-foreground">{title}</h2>
      <p className="text-muted-foreground">{lede}</p>
    </header>
    </Reveal>
  );
}
