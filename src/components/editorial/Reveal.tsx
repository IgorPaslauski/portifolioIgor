import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "image";
};

export default function Reveal({ children, className, delay = 0, variant = "up" }: RevealProps) {
  const reduce = useReducedMotion();
  const hidden =
    variant === "left"
      ? { opacity: 1, x: reduce ? 0 : -36, y: 0, scale: 1 }
      : variant === "image"
        ? { opacity: reduce ? 1 : 0, x: 0, y: 0, scale: reduce ? 1 : 1.06 }
        : { opacity: 1, x: 0, y: reduce ? 0 : motionTokens.distance, scale: 1 };

  return (
    <m.div
      className={className}
      initial={hidden}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={motionTokens.viewport}
      transition={{
        duration: reduce ? 0 : variant === "image" ? 0.9 : motionTokens.duration,
        delay: reduce ? 0 : delay,
        ease: motionTokens.ease,
      }}
    >
      {children}
    </m.div>
  );
}
