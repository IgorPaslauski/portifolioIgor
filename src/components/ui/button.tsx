import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost" | "line";
};

export function Button({ className, variant = "solid", type = "button", ...props }: Props) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ease-editorial disabled:cursor-not-allowed disabled:opacity-50",
        variant === "solid" && "bg-ember text-ink hover:bg-ember-glow",
        variant === "ghost" && "bg-paper/5 text-paper hover:bg-paper/10",
        variant === "line" && "border border-paper/20 text-paper hover:border-ember hover:text-ember",
        className,
      )}
      {...props}
    />
  );
}
