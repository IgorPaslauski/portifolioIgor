import { Lights } from "./lights";
import { CameraRig } from "./camera-rig";
import { Assembly } from "./assembly";
import { Field } from "./field";
import { useExperience } from "@/hooks/use-experience";

export function Scene() {
  const { tier } = useExperience();

  return (
    <>
      <CameraRig />
      <Lights />
      <Assembly />
      {tier === "high" && <Field />}
      <fog attach="fog" args={["#090807", 6.5, 16]} />
    </>
  );
}
