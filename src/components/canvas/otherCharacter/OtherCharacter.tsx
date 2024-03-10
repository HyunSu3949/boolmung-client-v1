import * as THREE from "three";
import React, { useEffect, useRef, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";

import { directionOffset } from "../utils";
import { ActionInfo, ActionName, GLTFResult } from "src/types/index";
import {
  FADE_IN,
  FADE_OUT,
  MODEL_SCALE,
  SPEED,
  assetsUrl,
} from "src/components/canvas/constant";

const rotateAxis = new THREE.Vector3(0, 1, 0);
const rotateQuarternion = new THREE.Quaternion();

type Props = {
  state: ActionInfo;
  image: string;
};

export function OtherCharacter({ state, image }: Props) {
  const { input, position, cameraCharacterAngleY, _id } = state;
  const { forward, backward, left, right } = input;

  const faceTexture = useLoader(THREE.TextureLoader, image);
  const currentAction = useRef("");

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

  useEffect(() => {
    let action: ActionName = "";
    if (forward || backward || left || right) {
      action = "walk";
    } else {
      action = "default";
    }

    if (currentAction.current !== action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(FADE_OUT);
      nextActionToPlay?.reset().fadeIn(FADE_IN).play();
      currentAction.current = action;
    }
  }, [forward, backward, left, right, actions]);

  useFrame((state, delta) => {
    if (currentAction.current === "walk") {
      const newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right,
      });

      rotateQuarternion.setFromAxisAngle(
        rotateAxis,
        cameraCharacterAngleY + newDirectionOffset,
      );

      clone.quaternion.rotateTowards(rotateQuarternion, 0.2);

      const direction = new THREE.Vector3(
        Math.sin(cameraCharacterAngleY),
        0,
        Math.cos(cameraCharacterAngleY),
      );
      direction.applyAxisAngle(rotateAxis, newDirectionOffset);

      const moveX = -direction.x * SPEED * delta;
      const moveZ = -direction.z * SPEED * delta;

      clone.position.x += moveX;
      clone.position.z += moveZ;
    }
  });
  return <primitive object={clone} ref={ref} />;
}

useGLTF.preload("/models/player7.glb");
