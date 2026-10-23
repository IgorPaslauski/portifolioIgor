import {
  BackSide,
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PMREMGenerator,
  Scene,
  type Texture,
  type WebGLRenderer,
} from "three";

/**
 * Soft industrial studio env (PMREM). Static — safe with frameloop="demand".
 * Bright panel lights give readable specular strips on bevels without chrome.
 */
export function createStudioEnvMap(gl: WebGLRenderer): Texture {
  const pmrem = new PMREMGenerator(gl);
  const scene = new Scene();

  // Dim shell so the void stays dark.
  const shell = new Mesh(
    new BoxGeometry(12, 12, 12),
    new MeshBasicMaterial({ color: 0x12161c, side: BackSide })
  );
  scene.add(shell);

  const panel = (w: number, h: number, color: number, x: number, y: number, z: number, rx = 0, ry = 0) => {
    const m = new Mesh(
      new BoxGeometry(w, h, 0.05),
      new MeshBasicMaterial({ color })
    );
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, 0);
    scene.add(m);
  };

  // Soft key / fill / rim panels (not HDRI file — no extra network).
  panel(4.5, 3.2, 0xf5f0e6, 0, 3.2, -4.5); // warm key
  panel(2.4, 2.8, 0xd8e4f0, -4.2, 1.6, 1.2, 0, Math.PI / 2); // cool fill
  panel(2.0, 1.6, 0xffffff, 3.8, 2.4, 2.0, 0, -Math.PI / 2); // rim highlight
  panel(6, 1.2, 0x2a3038, 0, -3.5, 0, Math.PI / 2, 0); // floor bounce (dim)

  // Low ambient sphere contribution via a weak emissive cube corner
  const bounce = new Mesh(
    new BoxGeometry(1.2, 1.2, 1.2),
    new MeshStandardMaterial({ color: 0x8899aa, emissive: 0x445566, emissiveIntensity: 0.4, roughness: 1 })
  );
  bounce.position.set(2.5, -2.2, 2.5);
  scene.add(bounce);

  const envMap = pmrem.fromScene(scene, 0.04).texture;
  pmrem.dispose();
  shell.geometry.dispose();
  (shell.material as MeshBasicMaterial).dispose();
  return envMap;
}

export function createFallbackStudioEnvMap(gl: WebGLRenderer): Texture {
  const pmrem = new PMREMGenerator(gl);
  const scene = new Scene();
  scene.background = new Color(0x1a1e24);
  const envMap = pmrem.fromScene(scene, 0.1).texture;
  pmrem.dispose();
  return envMap;
}
