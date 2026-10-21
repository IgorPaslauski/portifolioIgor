export default function HeroFallback() {
  return (
    <svg viewBox="0 0 640 720" className="h-full w-full" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="14">
        <rect x="150" y="90" width="300" height="460" transform="rotate(12 300 320)" className="text-foreground" />
        <rect x="210" y="160" width="230" height="340" transform="rotate(-18 325 330)" className="text-signal" />
        <rect x="250" y="230" width="160" height="230" transform="rotate(28 330 345)" className="text-foreground/50" />
      </g>
    </svg>
  );
}
