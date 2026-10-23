/** SVG silhouette matching Signature Lock (closed / open). Same piece identity as GLB. */

type FallbackProps = {
  state?: "closed" | "open";
  className?: string;
};

export default function MonogramFallback({ state = "closed", className }: FallbackProps) {
  const open = state === "open";
  return (
    <svg
      viewBox="0 0 320 480"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* spine */}
      <g
        stroke="currentColor"
        strokeWidth="10"
        strokeLinejoin="round"
        transform={open ? "translate(0 0)" : undefined}
      >
        <rect x="118" y="48" width="52" height="360" rx="3" className="text-foreground/90" fill="currentColor" opacity="0.88" />
        <rect x="104" y="48" width="80" height="28" rx="2" className="text-foreground/90" fill="currentColor" opacity="0.92" />
        <rect x="108" y="380" width="72" height="28" rx="2" className="text-foreground/90" fill="currentColor" opacity="0.92" />
      </g>
      {/* bowl */}
      <g
        transform={open ? "translate(48 8)" : "translate(0 0)"}
        className="text-foreground/85"
        fill="currentColor"
      >
        <path
          d="M168 120h92v210H188V168h-20z"
          opacity="0.9"
        />
        <path d="M188 168h52v72H188z" className="text-background" fill="currentColor" opacity="0.55" />
      </g>
      {/* cap */}
      <rect
        x="96"
        y={open ? 18 : 36}
        width="110"
        height="36"
        rx="2"
        className="text-foreground"
        fill="currentColor"
        opacity="0.95"
      />
      {/* key */}
      <g transform={open ? "translate(-18 -12) rotate(-12 160 210)" : "rotate(-12 160 220)"}>
        <rect
          x="70"
          y="208"
          width="170"
          height="16"
          rx="2"
          className="text-muted-foreground"
          fill="currentColor"
          opacity="0.95"
        />
        <rect x="62" y="200" width="22" height="32" rx="2" fill="currentColor" opacity="0.9" />
        <rect x="226" y="200" width="22" height="32" rx="2" fill="currentColor" opacity="0.9" />
      </g>
      {/* pin */}
      <g transform={open ? "translate(36 0)" : "translate(8 0)"}>
        <rect
          x="148"
          y="248"
          width="14"
          height="52"
          rx="7"
          className="text-signal"
          fill="currentColor"
        />
        <circle cx="155" cy="248" r="9" className="text-signal" fill="currentColor" />
        <circle cx="155" cy="300" r="9" className="text-signal" fill="currentColor" />
      </g>
    </svg>
  );
}
