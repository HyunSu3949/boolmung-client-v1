import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";

import { GLTFResult, Input, Position } from "src/types/index";
import { MODEL_SCALE, assetsUrl } from "src/utils/character/constants";
import useMovement from "src/hooks/character/useMovement";

type Props = {
  state: {
    input: Input;
    position: Position;
    cameraCharacterAngleY: number;
    image: string;
  };
};

export function OtherCharacter({ state }: Props) {
  const { input, position, cameraCharacterAngleY, image } = state;
  const positionRef = useRef(position);

  const model = useGLTF(assetsUrl.model) as GLTFResult;
  const faceTexture = useLoader(THREE.TextureLoader, image);

  const clonedModel = useMemo(() => {
    const clonedScene = SkeletonUtils.clone(model.scene);

    faceTexture.flipY = false;

    clonedScene.traverse((child: any) => {
      if (child.isMesh && child.material.name === "face") {
        const clonedMaterial = child.material.clone();
        clonedMaterial.map = faceTexture;

        child.material = clonedMaterial;
        child.material.needsUpdate = true;
      }
    });
    return { ...model, scene: clonedScene };
  }, [faceTexture, model]);

  useEffect(() => {
    const { x, y, z } = position;
    clonedModel.scene.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);
    clonedModel.scene.position.set(x, y, z);
  }, [position, clonedModel.scene]);

  useMovement({
    model: clonedModel,
    input,
    cameraAngle: cameraCharacterAngleY,
    positionRef,
  });

  return <primitive object={clonedModel.scene} />;
}

useGLTF.preload("/models/player7.glb");
