import { Lights } from "./lights";
import { CameraRig } from "./camera-rig";
import { Engine } from "./engine";
import { Field } from "./field";
import { ProjectNodes } from "./project-nodes";
import { useExperience } from "@/hooks/use-experience";

export function Scene() {
  const { tier } = useExperience();

  return (
    <>
      <CameraRig />
      <Lights />
      <Engine />
      {tier !== "low" && <Field />}
      {tier !== "low" && <ProjectNodes />}
      <fog attach="fog" args={["#090807", 7.5, 18]} />
    </>
  );
}
