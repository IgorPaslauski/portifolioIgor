type CodeBlockProps = {
  caption: string;
  filename: string;
  code: string;
};

export default function CodeBlock({ caption, filename, code }: CodeBlockProps) {
  return (
    <figure className="overflow-hidden border border-border bg-card">
      <figcaption className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {caption}
        </span>
        <span className="font-mono text-[10px] text-signal">{filename}</span>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-foreground/90 sm:p-5 sm:text-[13px]">
        <code className="font-mono">{code}</code>
      </pre>
    </figure>
  );
}
