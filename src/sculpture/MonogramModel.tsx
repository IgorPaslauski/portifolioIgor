import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Box3,
  Color,
  Euler,
  Mesh,
  MeshStandardMaterial,
  Vector3,
  type Group,
  type Object3D,
  type PerspectiveCamera,
} from "three";
import { loadMonogram } from "./loadMonogram";
import { poseFromProgress, type PieceName, type SculpturePose } from "./poses";
import { useSculpture } from "./SculptureContext";

const PIECES: PieceName[] = ["spine", "bowl", "cap", "key", "pin"];

// Satin industrial: specular from env + key light; avoid chrome / neon.
const MATERIALS: Record<
  PieceName,
  { color: string; metalness: number; roughness: number; envMapIntensity: number }
> = {
  spine: { color: "#C8CED8", metalness: 0.68, roughness: 0.34, envMapIntensity: 0.85 },
  bowl: { color: "#C8CED8", metalness: 0.7, roughness: 0.32, envMapIntensity: 0.9 },
  cap: { color: "#D4DAE4", metalness: 0.62, roughness: 0.3, envMapIntensity: 0.8 },
  key: { color: "#252A31", metalness: 0.55, roughness: 0.42, envMapIntensity: 0.55 },
  pin: { color: "#78F0A4", metalness: 0.4, roughness: 0.4, envMapIntensity: 0.6 },
};

function applyStudioMaterials(pieces: Record<PieceName, Object3D>) {
  for (const name of PIECES) {
    const spec = MATERIALS[name];
    pieces[name].traverse((node) => {
      if (!(node instanceof Mesh)) return;
      if (node.geometry && !node.geometry.getAttribute("normal")) {
        node.geometry.computeVertexNormals();
      } else if (node.geometry) {
        // Refresh normals so bevels/recesses read after boolean export.
        node.geometry.computeVertexNormals();
      }
      node.material = new MeshStandardMaterial({
        color: new Color(spec.color),
        metalness: spec.metalness,
        roughness: spec.roughness,
        envMapIntensity: spec.envMapIntensity,
        flatShading: false,
        ...(name === "pin"
          ? { emissive: new Color("#3A9A68"), emissiveIntensity: 0.08 }
          : {}),
      });
      node.castShadow = false;
      node.receiveShadow = false;
    });
  }
}

type Rest = {
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
};

function applyPose(
  group: Group,
  pieces: Record<PieceName, Object3D>,
  rests: Record<PieceName, Rest>,
  pose: SculpturePose,
  pointer: { x: number; y: number },
  allowParallax: boolean
) {
  const px = allowParallax ? pointer.x : 0;
  const py = allowParallax ? pointer.y : 0;
  group.position.set(
    pose.group.position[0],
    pose.group.position[1],
    pose.group.position[2]
  );
  group.rotation.set(
    pose.group.rotation[0] + px,
    pose.group.rotation[1] + py,
    pose.group.rotation[2]
  );
  group.scale.setScalar(pose.group.scale);

  for (const name of PIECES) {
    const node = pieces[name];
    const rest = rests[name];
    const p = pose.pieces[name];
    node.position.set(
      rest.position.x + p.position[0],
      rest.position.y + p.position[1],
      rest.position.z + p.position[2]
    );
    node.rotation.set(
      rest.rotation.x + p.rotation[0],
      rest.rotation.y + p.rotation[1],
      rest.rotation.z + p.rotation[2]
    );
    node.scale.set(
      rest.scale.x * p.scale[0],
      rest.scale.y * p.scale[1],
      rest.scale.z * p.scale[2]
    );
  }
}

function applyCamera(camera: PerspectiveCamera, pose: SculpturePose) {
  camera.position.set(pose.camera.position[0], pose.camera.position[1], pose.camera.position[2]);
  camera.lookAt(pose.camera.target[0], pose.camera.target[1], pose.camera.target[2]);
  if (Math.abs(camera.fov - pose.camera.fov) > 0.01) {
    camera.fov = pose.camera.fov;
    camera.updateProjectionMatrix();
  }
}

export default function MonogramModel({
  onPresented,
  onFail,
}: {
  onPresented: () => void;
  onFail: () => void;
}) {
  const { progressRef, pointer, invalidateRef, reducedMotion, subscribeProgress } = useSculpture();
  const { camera, invalidate } = useThree();
  const groupRef = useRef<Group>(null);
  const piecesRef = useRef<Record<PieceName, Object3D> | null>(null);
  const restsRef = useRef<Record<PieceName, Rest> | null>(null);
  const readyRef = useRef(false);
  const lastT = useRef(-1);
  const lastPointer = useRef({ x: 0, y: 0 });
  const presented = useRef(false);

  useEffect(() => {
    invalidateRef.current = invalidate;
  }, [invalidate, invalidateRef]);

  useEffect(() => {
    let cancelled = false;
    loadMonogram()
      .then(({ root, pieces }) => {
        if (cancelled) return;
        const group = groupRef.current;
        if (!group) return;
        group.clear();
        group.add(root);
        piecesRef.current = pieces;
        applyStudioMaterials(pieces);
        const rests = {} as Record<PieceName, Rest>;
        for (const name of PIECES) {
          const node = pieces[name];
          rests[name] = {
            position: node.position.clone(),
            rotation: node.rotation.clone(),
            scale: node.scale.clone(),
          };
        }
        restsRef.current = rests;
        const pose = poseFromProgress(progressRef.current);
        applyPose(group, pieces, rests, pose, pointer.current, !reducedMotion && progressRef.current < 0.05);
        applyCamera(camera as PerspectiveCamera, pose);
        // Ref (not state): demand-mode invalidate must see ready in the same tick.
        readyRef.current = true;
        lastT.current = -1;
        const box = new Box3().setFromObject(group);
        const size = new Vector3();
        const center = new Vector3();
        box.getSize(size);
        box.getCenter(center);
        if (typeof window !== "undefined") {
          (window as Window & { __monogramDebug?: object }).__monogramDebug = {
            pieces: Object.keys(pieces),
            size: size.toArray(),
            center: center.toArray(),
            cam: camera.position.toArray(),
          };
        }
        invalidate();
        // Second tick: demand-mode sometimes drops the first invalidate before layout.
        requestAnimationFrame(() => invalidate());
        if (!presented.current) {
          presented.current = true;
          onPresented();
        }
      })
      .catch(() => {
        if (!cancelled) onFail();
      });
    return () => {
      cancelled = true;
      readyRef.current = false;
    };
  }, [camera, invalidate, onFail, onPresented, pointer, progressRef, reducedMotion]);

  useEffect(() => {
    return subscribeProgress(() => {
      lastT.current = -1;
      invalidate();
    });
  }, [invalidate, subscribeProgress]);

  useFrame(() => {
    const group = groupRef.current;
    const pieces = piecesRef.current;
    const rests = restsRef.current;
    if (!group || !pieces || !rests || !readyRef.current) return;

    const t = progressRef.current;
    const ptr = pointer.current;
    const parallaxActive = !reducedMotion && t < 0.08;
    const parallaxMoved =
      parallaxActive &&
      (Math.abs(ptr.x - lastPointer.current.x) > 0.0008 || Math.abs(ptr.y - lastPointer.current.y) > 0.0008);
    const progressMoved = Math.abs(t - lastT.current) > 0.0005;

    // Demand mode: exit without invalidate when nothing changed (no continuous GPU burn).
    if (!progressMoved && !parallaxMoved) return;

    lastT.current = t;
    lastPointer.current = { x: ptr.x, y: ptr.y };
    const pose = poseFromProgress(reducedMotion ? (t > 0.5 ? 1 : 0) : t);
    applyPose(group, pieces, rests, pose, ptr, parallaxActive);
    applyCamera(camera as PerspectiveCamera, pose);

    // Expose for audit / DevTools
    if (typeof window !== "undefined") {
      (window as Window & { __sculptureAudit?: object }).__sculptureAudit = {
        t,
        reducedMotion,
        at: performance.now(),
      };
    }

    // Only request another frame if pointer may still be moving while parallax is live.
    if (parallaxMoved) invalidate();
  });

  return <group ref={groupRef} />;
}
