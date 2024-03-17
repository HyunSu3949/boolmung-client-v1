import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useSelector } from "react-redux";

import { GLTFResult } from "src/types";
import useMovement from "src/hooks/character/useMovement";
import {
  FACE_MATERIAL,
  BODY_MATERIAL,
  MODEL_SCALE,
  assetsUrl,
} from "src/utils/character/constants";
import { getTextureLoader } from "src/utils/character/textureUtils";
import useDispatchMovement from "src/hooks/character/useDispatchMovement";
import { useCharacterPosition } from "src/components/canvas/myCharacter/CharacterContext";
import { RootState } from "src/redux/store";
import useCameraMovement from "src/hooks/character/useCameraMove";
import useCameraAngle from "src/hooks/character/useCameraAngle";
import { useInput } from "src/hooks/character/useInput";

export function Character() {
  const model = useGLTF(assetsUrl.model) as GLTFResult;
  const positionRef = useCharacterPosition();
  const { image } = useSelector(
    (state: RootState) => state.reducer.authReducer.user,
  );
  const input = useInput();
  const cameraAngle = useCameraAngle({ positionRef });

  useCameraMovement({ input, positionRef, cameraAngle });
  useMovement({ input, positionRef, cameraAngle, model });
  useDispatchMovement({ input, positionRef, cameraAngle });

  const { scene } = model;
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

    updateModelMaterial(FACE_MATERIAL, image, assetsUrl.face);
    updateModelMaterial(BODY_MATERIAL, assetsUrl.body, assetsUrl.body);

    scene.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);
  }, [model.materials, scene, image]);

  return <primitive object={scene} rotation={[0, Math.PI / 2, 0]} />;
}

useGLTF.preload("/models/player7.glb");
