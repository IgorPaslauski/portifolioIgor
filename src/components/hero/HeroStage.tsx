import { Suspense, useEffect, useState, type ComponentType, type RefObject } from "react";
import { useTheme } from "next-themes";
import HeroFallback from "./HeroFallback";
import type { HeroCanvasProps, SceneTarget } from "./HeroCanvas";
import SceneErrorBoundary from "./SceneErrorBoundary";

const PALETTE = {
  light: { bone: "#F7F4EE", signal: "#FF4D1A", graphite: "#1C1B18" },
  dark: { bone: "#F3EEE6", signal: "#FF5C2E", graphite: "#8E8A84" },
};

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

function canUseWebGL() {
  try {
    const probe = document.createElement("canvas");
    return Boolean(probe.getContext("webgl") || probe.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

type HeroStageProps = {
  imageRef: RefObject<HTMLImageElement | null>;
  target: React.MutableRefObject<SceneTarget>;
  invalidateRef: React.MutableRefObject<() => void>;
};

export default function HeroStage({ imageRef, target, invalidateRef }: HeroStageProps) {
  const { resolvedTheme } = useTheme();
  const palette = resolvedTheme === "dark" ? PALETTE.dark : PALETTE.light;
  const [presented, setPresented] = useState(false);
  const [failed, setFailed] = useState(false);
  const [CanvasView, setCanvasView] = useState<ComponentType<HeroCanvasProps> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!canUseWebGL()) {
      setFailed(true);
      return;
    }

    let cancelled = false;
    let started = false;
    let photoReady = imageRef.current?.complete ?? false;
    let idle = false;

    const start = () => {
      if (cancelled || started || !photoReady || !idle) return;
      started = true;
      import("./HeroCanvas")
        .then((mod) => {
          if (!cancelled) setCanvasView(() => mod.default);
        })
        .catch(() => {
          if (!cancelled) setFailed(true);
        });
    };

    const onPhoto = () => {
      photoReady = true;
      start();
    };

    const image = imageRef.current;
    image?.addEventListener("load", onPhoto);
    image?.addEventListener("error", onPhoto);

    const idleWindow = window as IdleWindow;
    const idleId = idleWindow.requestIdleCallback
      ? idleWindow.requestIdleCallback(
          () => {
            idle = true;
            start();
          },
          { timeout: 1500 }
        )
      : window.setTimeout(() => {
          idle = true;
          start();
        }, 300);

    if (photoReady) start();

    return () => {
      cancelled = true;
      image?.removeEventListener("load", onPhoto);
      image?.removeEventListener("error", onPhoto);
      if (idleWindow.cancelIdleCallback && idleWindow.requestIdleCallback) {
        idleWindow.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, [imageRef]);

  const showScene = Boolean(CanvasView) && !failed;

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <div className={presented && !failed ? "h-full opacity-0" : "h-full text-foreground opacity-100"}>
        <HeroFallback />
      </div>
      {showScene && CanvasView && (
        <div className={`absolute inset-0 ${presented ? "opacity-100" : "opacity-0"}`}>
          <SceneErrorBoundary onError={() => setFailed(true)}>
            <Suspense fallback={null}>
              <CanvasView
                target={target}
                invalidateRef={invalidateRef}
                bone={palette.bone}
                signal={palette.signal}
                graphite={palette.graphite}
                onPresented={() => setPresented(true)}
                onFail={() => setFailed(true)}
              />
            </Suspense>
          </SceneErrorBoundary>
        </div>
      )}
    </div>
  );
}
