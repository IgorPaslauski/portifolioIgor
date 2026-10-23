import { useEffect, useRef, useState } from "react";

/**
 * Progress t ∈ [0,1] from mid-#home through work/lab/engineering to #contact.
 * End near contact top so #contact âncora ≈ poseClosing.
 * Passive listeners only — no scroll hijacking.
 */
export function useSectionProgress(heroId: string, contactId: string) {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const listeners = useRef(new Set<(t: number) => void>());

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const contact = document.getElementById(contactId);
    if (!hero || !contact) return;

    let frame = 0;

    const commit = (t: number) => {
      const next = Math.round(t * 1000) / 1000;
      if (Math.abs(next - progressRef.current) < 0.001) return;
      progressRef.current = next;
      setProgress(next);
      listeners.current.forEach((fn) => fn(next));
      if (typeof window !== "undefined") {
        (window as Window & { __sculptureProgress?: number }).__sculptureProgress = next;
      }
    };

    const measure = () => {
      const start = hero.offsetTop + hero.offsetHeight * 0.26;
      const end = contact.offsetTop + 32;
      const minSpan = Math.max(720, Math.round(window.innerHeight * 1.15));
      const span = Math.max(end - start, minSpan);
      const marker = window.scrollY + window.innerHeight * 0.28;
      const raw = (marker - start) / span;
      commit(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [heroId, contactId]);

  const subscribe = (fn: (t: number) => void) => {
    listeners.current.add(fn);
    return () => {
      listeners.current.delete(fn);
    };
  };

  return { progress, progressRef, subscribe };
}
