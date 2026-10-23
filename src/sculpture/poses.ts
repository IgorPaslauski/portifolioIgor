export type Vec3 = [number, number, number];

export type PieceName = "spine" | "bowl" | "cap" | "key" | "pin";

export type PiecePose = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
};

export type CameraPose = {
  position: Vec3;
  target: Vec3;
  fov: number;
};

export type SculpturePose = {
  group: { position: Vec3; rotation: Vec3; scale: number };
  pieces: Record<PieceName, PiecePose>;
  camera: CameraPose;
};

const identityPiece = (): PiecePose => ({
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: [1, 1, 1],
});

/** Hero — closed seal. Pin peeks for signal green without reading as open. */
export const poseHero: SculpturePose = {
  group: { position: [0.08, -0.02, 0], rotation: [0.08, -0.52, 0.02], scale: 1.18 },
  pieces: {
    spine: identityPiece(),
    bowl: identityPiece(),
    cap: identityPiece(),
    key: { position: [0, 0.01, 0.05], rotation: [0, 0.03, 0], scale: [1, 1, 1] },
    pin: { position: [0.015, 0.015, 0.18], rotation: [0, 0, 0], scale: [1, 1, 1] },
  },
  camera: { position: [0.52, 0.16, 4.9], target: [0.1, 0.03, 0], fov: 28 },
};

/**
 * Unlock — mechanical first beat: key withdraws, pin lifts clear of the bore.
 * Bowl/cap still seated so the motion reads as “desbloqueio”, not explode.
 */
export const poseUnlock: SculpturePose = {
  group: { position: [0.06, -0.03, 0], rotation: [0.1, -0.58, 0.02], scale: 1.14 },
  pieces: {
    spine: identityPiece(),
    bowl: { position: [0.06, 0.01, 0.02], rotation: [0, 0.02, 0], scale: [1, 1, 1] },
    cap: { position: [0, 0.04, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
    key: { position: [-0.22, 0.06, 0.22], rotation: [0, 0.28, 0.08], scale: [1, 1, 1] },
    pin: { position: [0.04, 0.22, 0.32], rotation: [0.05, 0, 0], scale: [1, 1, 1] },
  },
  camera: { position: [0.58, 0.18, 5.0], target: [0.12, 0.06, 0], fov: 29 },
};

/**
 * Opening — pieces separate and reveal encaixes; still large in frame.
 */
export const poseOpening: SculpturePose = {
  group: { position: [0.1, -0.06, 0], rotation: [0.12, -0.68, 0.02], scale: 1.02 },
  pieces: {
    spine: identityPiece(),
    bowl: { position: [0.38, 0.06, 0.16], rotation: [0, 0.12, 0.02], scale: [1, 1, 1] },
    cap: { position: [0, 0.22, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
    key: { position: [-0.28, 0.1, 0.36], rotation: [0, 0.32, 0.1], scale: [1, 1, 1] },
    pin: { position: [0.06, 0.08, 0.52], rotation: [0, 0, 0], scale: [1, 1, 1] },
  },
  camera: { position: [0.72, 0.12, 5.25], target: [0.16, 0.02, 0], fov: 30 },
};

/**
 * Selected Work — architecture open, sculpture recedes to the far right
 * so copy and case slot keep the primary reading plane.
 */
export const poseWork: SculpturePose = {
  group: { position: [0.95, -0.2, -0.25], rotation: [0.18, -1.05, 0.04], scale: 0.4 },
  pieces: {
    spine: identityPiece(),
    bowl: { position: [0.58, 0.1, 0.24], rotation: [0, 0.14, 0.03], scale: [1, 1, 1] },
    cap: { position: [0, 0.36, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
    key: { position: [-0.22, 0.14, 0.48], rotation: [0, 0.26, 0.08], scale: [1, 1, 1] },
    pin: { position: [0.06, 0.06, 0.72], rotation: [0, 0, 0], scale: [1, 1, 1] },
  },
  camera: { position: [1.55, -0.02, 6.5], target: [0.55, -0.1, 0], fov: 34 },
};

/**
 * Lab — pin (signal) slightly isolated for identity without stealing reading plane.
 * Soft camera nudge; no abrupt jump from poseWork.
 */
export const poseLabDetail: SculpturePose = {
  group: { position: [1.05, -0.18, -0.3], rotation: [0.2, -1.12, 0.05], scale: 0.36 },
  pieces: {
    spine: identityPiece(),
    bowl: { position: [0.62, 0.08, 0.2], rotation: [0, 0.12, 0.02], scale: [1, 1, 1] },
    cap: { position: [0, 0.38, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
    key: { position: [-0.28, 0.1, 0.4], rotation: [0, 0.2, 0.06], scale: [1, 1, 1] },
    pin: { position: [0.08, 0.12, 0.85], rotation: [0.08, 0, 0], scale: [1.05, 1.05, 1.05] },
  },
  camera: { position: [1.45, 0.06, 6.35], target: [0.62, -0.04, 0.1], fov: 32 },
};

/**
 * Engineering — pieces partially reseated; quieter presence while copy leads.
 */
export const poseEngineering: SculpturePose = {
  group: { position: [0.55, -0.1, -0.1], rotation: [0.12, -0.72, 0.02], scale: 0.55 },
  pieces: {
    spine: identityPiece(),
    bowl: { position: [0.22, 0.04, 0.08], rotation: [0, 0.06, 0], scale: [1, 1, 1] },
    cap: { position: [0, 0.12, 0], rotation: [0, 0, 0], scale: [1, 1, 1] },
    key: { position: [-0.1, 0.04, 0.18], rotation: [0, 0.1, 0.03], scale: [1, 1, 1] },
    pin: { position: [0.03, 0.04, 0.35], rotation: [0, 0, 0], scale: [1, 1, 1] },
  },
  camera: { position: [0.95, 0.08, 5.8], target: [0.28, -0.02, 0], fov: 31 },
};

/** Closing — seal returns; mirrors hero presence for contact echo. */
export const poseClosing: SculpturePose = {
  group: { position: [0.08, -0.02, 0], rotation: [0.08, -0.52, 0.02], scale: 1.12 },
  pieces: {
    spine: identityPiece(),
    bowl: identityPiece(),
    cap: identityPiece(),
    key: { position: [0, 0.01, 0.05], rotation: [0, 0.03, 0], scale: [1, 1, 1] },
    pin: { position: [0.015, 0.015, 0.18], rotation: [0, 0, 0], scale: [1, 1, 1] },
  },
  camera: { position: [0.52, 0.16, 4.95], target: [0.1, 0.03, 0], fov: 28 },
};

export type PoseId = "hero" | "unlock" | "opening" | "work" | "lab" | "engineering" | "closing";

export const POSES: Record<PoseId, SculpturePose> = {
  hero: poseHero,
  unlock: poseUnlock,
  opening: poseOpening,
  work: poseWork,
  lab: poseLabDetail,
  engineering: poseEngineering,
  closing: poseClosing,
};

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function lerpVec3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

export function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

export function lerpPiece(a: PiecePose, b: PiecePose, t: number): PiecePose {
  return {
    position: lerpVec3(a.position, b.position, t),
    rotation: lerpVec3(a.rotation, b.rotation, t),
    scale: lerpVec3(a.scale, b.scale, t),
  };
}

export function lerpSculpture(a: SculpturePose, b: SculpturePose, t: number): SculpturePose {
  const e = smoothstep(t);
  return {
    group: {
      position: lerpVec3(a.group.position, b.group.position, e),
      rotation: lerpVec3(a.group.rotation, b.group.rotation, e),
      scale: lerp(a.group.scale, b.group.scale, e),
    },
    pieces: {
      spine: lerpPiece(a.pieces.spine, b.pieces.spine, e),
      bowl: lerpPiece(a.pieces.bowl, b.pieces.bowl, e),
      cap: lerpPiece(a.pieces.cap, b.pieces.cap, e),
      key: lerpPiece(a.pieces.key, b.pieces.key, e),
      pin: lerpPiece(a.pieces.pin, b.pieces.pin, e),
    },
    camera: {
      position: lerpVec3(a.camera.position, b.camera.position, e),
      target: lerpVec3(a.camera.target, b.camera.target, e),
      fov: lerp(a.camera.fov, b.camera.fov, e),
    },
  };
}

/**
 * Mechanical scroll choreography (reversible; no hijack):
 * 0–0.16  hero → unlock
 * 0.16–0.28 unlock → opening
 * 0.28–0.46 opening → work
 * 0.46–0.60 work → labDetail
 * 0.60–0.78 lab → engineering
 * 0.78–1  engineering → closing (seal)
 */
export function poseFromProgress(t: number): SculpturePose {
  const p = Math.min(1, Math.max(0, t));
  if (p <= 0.16) {
    return lerpSculpture(poseHero, poseUnlock, p / 0.16);
  }
  if (p <= 0.28) {
    return lerpSculpture(poseUnlock, poseOpening, (p - 0.16) / 0.12);
  }
  if (p <= 0.46) {
    return lerpSculpture(poseOpening, poseWork, (p - 0.28) / 0.18);
  }
  if (p <= 0.6) {
    return lerpSculpture(poseWork, poseLabDetail, (p - 0.46) / 0.14);
  }
  if (p <= 0.78) {
    return lerpSculpture(poseLabDetail, poseEngineering, (p - 0.6) / 0.18);
  }
  return lerpSculpture(poseEngineering, poseClosing, (p - 0.78) / 0.22);
}
