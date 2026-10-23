import { useEffect } from "react";
import { useTheme } from "next-themes";

const THEME_COLORS = {
  light: "#0B0D10",
  dark: "#0B0D10",
} as const;

export default function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLORS[resolvedTheme]);
  }, [resolvedTheme]);

  return null;
}
