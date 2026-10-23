import { Suspense, useEffect, useState, type ComponentType } from "react";
import MonogramFallback from "./MonogramFallback";
import type { MonogramCanvasProps } from "./MonogramCanvas";
import SceneErrorBoundary from "@/components/hero/SceneErrorBoundary";
import { useSculpture } from "./SculptureContext";

function canUseWebGL() {
  try {
    const probe = document.createElement("canvas");
    return Boolean(probe.getContext("webgl") || probe.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export default function MonogramStage() {
  const { progress, reducedMotion } = useSculpture();
  const [presented, setPresented] = useState(false);
  const [failed, setFailed] = useState(false);
  const [CanvasView, setCanvasView] = useState<ComponentType<MonogramCanvasProps> | null>(null);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024
  );
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { rootMargin: "10% 0px", threshold: 0.02 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const forceFallback =
    typeof window !== "undefined" && new URLSearchParams(window.location.search).has("fallback");
  const allowWebGL =
    !forceFallback && !reducedMotion && canUseWebGL() && (isDesktop || heroVisible);

  useEffect(() => {
    if (!allowWebGL) {
      setCanvasView(null);
      return;
    }

    let cancelled = false;
    const idleWindow = window as IdleWindow;
    const start = () => {
      import("./MonogramCanvas")
        .then((mod) => {
          if (!cancelled) setCanvasView(() => mod.default);
        })
        .catch(() => {
          if (!cancelled) setFailed(true);
        });
    };

    const idleId = idleWindow.requestIdleCallback
      ? idleWindow.requestIdleCallback(start, { timeout: 1200 })
      : window.setTimeout(start, 200);

    return () => {
      cancelled = true;
      if (idleWindow.cancelIdleCallback && idleWindow.requestIdleCallback) {
        idleWindow.cancelIdleCallback(idleId as number);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, [allowWebGL]);

  const showScene = Boolean(CanvasView) && !failed && allowWebGL;
  // Open through work/lab/engineering; closed at hero and closing seal.
  const fallbackState = progress > 0.28 && progress < 0.82 ? "open" : "closed";

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <div
        className={`h-full text-foreground transition-opacity duration-500 ${
          presented && showScene ? "opacity-0" : "opacity-100"
        }`}
      >
        <MonogramFallback state={fallbackState} className="h-full w-full" />
      </div>
      {showScene && CanvasView && (
        <div className={`absolute inset-0 ${presented ? "opacity-100" : "opacity-0"}`}>
          <SceneErrorBoundary onError={() => setFailed(true)}>
            <Suspense fallback={null}>
              <CanvasView onPresented={() => setPresented(true)} onFail={() => setFailed(true)} />
            </Suspense>
          </SceneErrorBoundary>
        </div>
      )}
    </div>
  );
}
