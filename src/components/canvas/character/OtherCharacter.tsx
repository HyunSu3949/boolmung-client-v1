import * as THREE from "three";
import React, { useEffect, useRef, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import { directionOffset } from "./utils";

type ActionName = "default" | "walk" | "";

let rotateAxis = new THREE.Vector3(0, 1, 0);
let rotateQuarternion = new THREE.Quaternion();

export const OtherCharacter = ({ model, state }: any) => {
  const { input, position, cameraCharacterAngleY } = state;

  const { forward, backward, left, right } = input;
  const currentAction = useRef("");

  const { animations, scene } = model;
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { ref, actions } = useAnimations(animations);

  clone.scale.set(1.2, 1.2, 1.2);
  clone.position.set(position[0], position[1], position[2]);

  useEffect(() => {
    let action: ActionName = "";

    if (forward || backward || left || right) {
      action = "walk";
    } else {
      action = "default";
    }

    if (currentAction.current != action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [forward, backward, left, right]);

  useFrame((state, delta) => {
    if (currentAction.current == "walk") {
      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right,
      });

      rotateQuarternion.setFromAxisAngle(
        rotateAxis,
        cameraCharacterAngleY + newDirectionOffset
      );

      clone.quaternion.rotateTowards(rotateQuarternion, 0.2);

      let direction = new THREE.Vector3(
        Math.sin(cameraCharacterAngleY),
        0,
        Math.cos(cameraCharacterAngleY)
      );
      direction.applyAxisAngle(rotateAxis, newDirectionOffset);

      const moveX = -direction.x * 2 * delta;
      const moveZ = -direction.z * 2 * delta;

      clone.position.x += moveX;
      clone.position.z += moveZ;
    }
  });
  return (
    <>
      <primitive object={clone} ref={ref} />
    </>
  );
};

useGLTF.preload("/models/player.glb");
