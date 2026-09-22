import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement = HTMLElement>(threshold = 0.4) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= threshold * 0.6),
      { threshold: [0.15, 0.35, 0.55, 0.75] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
