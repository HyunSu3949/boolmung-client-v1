import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";

import { ActionInfo, GLTFResult } from "src/types/index";
import { MODEL_SCALE, SPEED, assetsUrl } from "src/utils/character/constants";
import useActions from "src/hooks/character/useActions";

import {
  directionOffset,
  getDirection,
  getRotateQuaternion,
  calcNewCharacterPos,
} from "../../../utils/character/movementUtils";

type Props = {
  state: ActionInfo;
  image: string;
};

export function OtherCharacter({ state, image }: Props) {
  const { input, position, cameraCharacterAngleY } = state;

  const faceTexture = useLoader(THREE.TextureLoader, image);

  const model = useGLTF(assetsUrl.model) as GLTFResult;
  const { animations, scene } = model;

  const clone = useMemo(() => {
    const clonedScene = SkeletonUtils.clone(scene);
    clonedScene.animations = animations.filter(
      (clip: any) => clip.name === "walk" || clip.name === "default",
    );
    faceTexture.flipY = false;
    clonedScene.traverse((child: any) => {
      if (child.isMesh && child.material.name === "face") {
        const clonedMaterial = child.material.clone();
        clonedMaterial.map = faceTexture;
        child.material = clonedMaterial;

        child.material.needsUpdate = true;
      }
    });

    return clonedScene;
  }, [animations, faceTexture, scene]);

  const { actions, ref } = useAnimations(clone.animations);
  clone.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);
  clone.position.set(position.x, position.y, position.z);

  const { action } = useActions({ actions, input });

  useFrame((_, delta) => {
    if (action === "walk") {
      const offset = directionOffset(input);

      const rotateQuarternion = getRotateQuaternion(
        cameraCharacterAngleY,
        offset,
      );
      clone.quaternion.rotateTowards(rotateQuarternion, 0.2);

      const direction = getDirection(cameraCharacterAngleY, offset);

      const newPosition = calcNewCharacterPos(direction, delta, clone.position);
      clone.position.x = newPosition.x;
      clone.position.z = newPosition.z;
    }
  });
  return <primitive object={clone} ref={ref} />;
}

useGLTF.preload("/models/player7.glb");
