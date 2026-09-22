import { useEffect } from "react";
import { pointerRef } from "@/lib/pointer-ref";

export function usePointerBridge() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointerRef.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}
