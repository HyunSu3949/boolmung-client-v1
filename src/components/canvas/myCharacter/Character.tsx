import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useSelector } from "react-redux";

import { GLTFResult } from "src/types";
import { RootState } from "src/redux/store";
import OrbitControl from "src/components/canvas/myCharacter/OrbitControl";
import useMovement from "src/hooks/character/useMovement";
import {
  FACE_MATERIAL,
  BODY_MATERIAL,
  MODEL_SCALE,
  assetsUrl,
} from "src/utils/character/constants";
import { getTextureLoader } from "src/utils/character/textureUtils";

export function Character() {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const model = useGLTF(assetsUrl.model) as GLTFResult;
  const { scene } = model;

  const { positionRef } = useMovement({
    model,
  });

  useEffect(() => {
    const updateModelMaterial = async (
      materialKey: string,
      textureUrl: string,
      defaultTextureUrl: string,
    ) => {
      const asyncLoader = getTextureLoader();
      const texture =
        (await asyncLoader(textureUrl)) ||
        (await asyncLoader(defaultTextureUrl));
      if (texture) {
        model.materials[materialKey].map = texture;
        model.materials[materialKey].needsUpdate = true;
      }
    };

    const applyTextures = async () => {
      updateModelMaterial(FACE_MATERIAL, user.image, assetsUrl.face);
      updateModelMaterial(BODY_MATERIAL, assetsUrl.body, assetsUrl.body);
    };

    model.scene.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);
    applyTextures();
  }, [model.materials, model.scene.scale, user.image]);

  return (
    <>
      <OrbitControl positionRef={positionRef} />
      <primitive object={scene} rotation={[0, Math.PI / 2, 0]} />
    </>
  );
}

useGLTF.preload("/models/player7.glb");
