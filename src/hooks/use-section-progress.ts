import { useEffect, useState, type RefObject } from "react";
import { clamp } from "@/lib/utils";

export function useSectionProgress(ref: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const node = ref.current;
      if (!node) return;
      const total = node.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - node.offsetTop;
      setProgress(total > 0 ? clamp(scrolled / total) : 0);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}
