import { Atmosphere } from "./atmosphere";
import { CameraRig } from "./camera-rig";
import { Assembly } from "./assembly";
import { Field } from "./field";
import { useExperience } from "@/hooks/use-experience";

export function Scene() {
  const { tier } = useExperience();

  return (
    <>
      <CameraRig />
      <Atmosphere />
      <Assembly />
      {tier === "high" && <Field />}
      <fog attach="fog" args={["#090807", 8, 18]} />
    </>
  );
}
