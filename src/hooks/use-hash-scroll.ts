import { useEffect } from "react";

export function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const frame = window.setTimeout(scrollToHash, 80);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.clearTimeout(frame);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);
}
