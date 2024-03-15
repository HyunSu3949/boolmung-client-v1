import * as THREE from "three";

export const updateMaterial = (texture: THREE.Texture, material: any) => {
  material.map = texture;
  material.needsUpdate = true;
};

export const getTextureLoader = () => {
  return async (url: string, loader = new THREE.TextureLoader()) => {
    try {
      const texture = await loader.loadAsync(url);
      texture.flipY = false;
      return texture;
    } catch (e) {
      return null;
    }
  };
};
