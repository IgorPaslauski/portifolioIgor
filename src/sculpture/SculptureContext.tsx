import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { useSectionProgress } from "./useSectionProgress";

export type PointerTarget = { x: number; y: number };

type SculptureContextValue = {
  progress: number;
  progressRef: MutableRefObject<number>;
  subscribeProgress: (fn: (t: number) => void) => () => void;
  pointer: MutableRefObject<PointerTarget>;
  invalidateRef: MutableRefObject<() => void>;
  reducedMotion: boolean;
};

const SculptureContext = createContext<SculptureContextValue | null>(null);

export function SculptureProvider({
  children,
  reducedMotion,
}: {
  children: ReactNode;
  reducedMotion: boolean;
}) {
  const { progress, progressRef, subscribe } = useSectionProgress("home", "contact");
  const pointer = useRef<PointerTarget>({ x: 0, y: 0 });
  const invalidateRef = useRef<() => void>(() => {});

  const value = useMemo(
    () => ({
      progress,
      progressRef,
      subscribeProgress: subscribe,
      pointer,
      invalidateRef,
      reducedMotion,
    }),
    [progress, progressRef, subscribe, reducedMotion]
  );

  return <SculptureContext.Provider value={value}>{children}</SculptureContext.Provider>;
}

export function useSculpture() {
  const ctx = useContext(SculptureContext);
  if (!ctx) throw new Error("useSculpture must be used within SculptureProvider");
  return ctx;
}
