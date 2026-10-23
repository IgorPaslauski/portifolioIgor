import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Mesh, type Group, type Object3D } from "three";
import type { PieceName } from "./poses";

const PIECES: PieceName[] = ["spine", "bowl", "cap", "key", "pin"];

export type MonogramNodes = {
  root: Group;
  pieces: Record<PieceName, Object3D>;
};

let cache: Promise<MonogramNodes> | null = null;

export function loadMonogram(url = `${import.meta.env.BASE_URL}sculpture/monogram.glb`) {
  if (!cache) {
    cache = new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        url,
        (gltf) => {
          const root = gltf.scene;
          const pieces = {} as Record<PieceName, Object3D>;
          for (const name of PIECES) {
            const node = root.getObjectByName(name);
            if (!node) {
              reject(new Error(`Monogram mesh missing: ${name}`));
              return;
            }
            node.traverse((child) => {
              if (!(child instanceof Mesh) || !child.geometry) return;
              child.geometry.computeVertexNormals();
            });
            pieces[name] = node;
          }
          resolve({ root, pieces });
        },
        undefined,
        reject
      );
    });
  }
  return cache;
}

export function clearMonogramCache() {
  cache = null;
}
