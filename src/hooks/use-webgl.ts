import { useEffect, useState } from "react";
import { supportsWebGL } from "@/lib/performance";

export function useWebGL() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(supportsWebGL());
  }, []);

  return supported;
}
