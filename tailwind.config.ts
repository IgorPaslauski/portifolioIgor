import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#090807",
          50: "#14110E",
          100: "#1C1814",
          200: "#2C2722",
        },
        paper: {
          DEFAULT: "#EDE6D6",
          dim: "#C9C0AE",
        },
        dust: {
          DEFAULT: "#9A9184",
          deep: "#6E675C",
        },
        ember: {
          DEFAULT: "#E85D04",
          dim: "#B34703",
          glow: "#FF7A2E",
        },
      },
      fontFamily: {
        display: ["Syne", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Newsreader", "ui-serif", "Georgia", "serif"],
        sans: ["Source Sans 3", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.4rem, 12vw, 10.5rem)", { lineHeight: "0.86", letterSpacing: "-0.045em" }],
        "display-lg": ["clamp(2.4rem, 6.4vw, 5.6rem)", { lineHeight: "0.94", letterSpacing: "-0.04em" }],
        "display-md": ["clamp(1.8rem, 3.6vw, 3.2rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
      },
      maxWidth: {
        page: "78rem",
      },
      spacing: {
        gutter: "clamp(1.25rem, 4vw, 3.5rem)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
