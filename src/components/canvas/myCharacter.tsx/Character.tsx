import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useSelector } from "react-redux";

import { GLTFResult } from "src/types";
import { generateInitialPosition } from "../utils";
import { RootState } from "src/redux/store";
import useDispatchMovement from "src/components/canvas/myCharacter.tsx/useDispatchMovement";
import OrbitControl from "src/components/canvas/myCharacter.tsx/OrbitControl";
import useMovement from "src/components/canvas/myCharacter.tsx/useMovement";

const url = {
  face: "/img/defaultFace.png",
  body: "/img/body.png",
  model: "/models/player7.glb",
};
const BODY_MATERIAL = "Material.001";

export function Character() {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const model = useGLTF(url.model) as GLTFResult;
  const { animations, scene } = model;
  const { actions } = useAnimations<any>(animations, scene);

  const positionRef = useRef(generateInitialPosition());
  const { cameraCharacterAngleY, keyBoardInput } = useMovement({
    model,
    positionRef,
    actions,
  });
  useDispatchMovement({
    positionRef,
    cameraCharacterAngleY,
    keyBoardInput,
  });

  useEffect(() => {
    // material 세팅
    const updateMaterial = (texture: any, materials: any) => {
      texture.flipY = false;
      materials.map = texture;
      materials.needsUpdate = true;
    };

    const loadTexture = async (
      materials: any,
      url: string,
      defaultUrl: string,
    ) => {
      try {
        const loader = new THREE.TextureLoader();
        const loadedTexture = await loader.loadAsync(url);
        if (loadedTexture) {
          updateMaterial(loadedTexture, materials);
        }
      } catch (e: any) {
        const loader = new THREE.TextureLoader();
        const defaultTexture = await loader.loadAsync(defaultUrl);
        if (defaultTexture) {
          updateMaterial(defaultTexture, materials);
        }
      }
    };

    loadTexture(model.materials.face, user.image, url.face);
    loadTexture(model.materials[BODY_MATERIAL], url.body, url.body);
  }, [model.materials, user.image]);

  return (
    <>
      <OrbitControl positionRef={positionRef} />
      <primitive object={scene} rotation={[0, Math.PI / 2, 0]} />
    </>
  );
}

useGLTF.preload("/models/player7.glb");
