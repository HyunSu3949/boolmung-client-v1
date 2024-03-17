import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLTFResult, Input, Position } from "src/types/index";
import { FADE_IN, FADE_OUT, actionNames } from "src/utils/character/constants";
import { getCameraPosition } from "src/utils/character/cameraUtils";
import {
  calcNewCharacterPos,
  directionOffset,
  getDirection,
  getRotateQuaternion,
} from "src/utils/character/movementUtils";
import useAction from "src/hooks/character/useAction";

type Props = {
  model: GLTFResult;
  input: Input;
  cameraAngle: number;
  positionRef: React.MutableRefObject<Position>;
};

export default function useMovement({
  model,
  input,
  cameraAngle,
  positionRef,
}: Props) {
  const [currentAction, setCurrentAction] = useState("");

  const { animations, scene } = model;
  const { actions } = useAnimations<any>(animations, scene);

  const nextAction = useAction({ input });

  useEffect(() => {
    if (currentAction !== nextAction) {
      setCurrentAction(nextAction);

      actions[currentAction]?.fadeOut(FADE_OUT);
      actions[nextAction]?.reset().fadeIn(FADE_IN).play();
    }
  }, [actions, currentAction, nextAction]);

  useEffect(() => {
    const { x, y, z } = positionRef.current;
    const { cameraPositionX, cameraPositionZ } = getCameraPosition(x, z);
    const reverseCameraDrection = new THREE.Vector3(
      -cameraPositionX,
      scene.position.y,
      -cameraPositionZ,
    );
    scene.position.set(x, y, z);
    scene.lookAt(reverseCameraDrection);
  }, [scene, positionRef]);

  useFrame((_, delta) => {
    if (currentAction === actionNames.walk) {
      const offset = directionOffset(input);

      scene.quaternion.rotateTowards(
        getRotateQuaternion(cameraAngle, offset),
        FADE_IN,
      );

      const newCharacterPosition = calcNewCharacterPos(
        getDirection(cameraAngle, directionOffset(input)),
        delta,
        scene.position,
      );
      scene.position.set(
        newCharacterPosition.x,
        newCharacterPosition.y,
        newCharacterPosition.z,
      );

      positionRef.current = newCharacterPosition;
    }
  });
}
