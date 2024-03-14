import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { GLTFResult } from "src/types/index";
import useDispatchMovement from "src/hooks/character/useDispatchMovement";
import useActions from "src/hooks/character/useActions";
import { DEBOUNCE, FADE_IN, actionNames } from "src/utils/character/constants";
import { generateInitialPosition } from "src/utils/character/positionUtils";
import {
  calculateCameraToModelDirectionAngle,
  getCameraPosition,
} from "src/utils/character/cameraUtils";
import {
  calcNewCameraPos,
  calcNewCharacterPos,
  directionOffset,
  getDirection,
  getRotateQuaternion,
} from "src/utils/character/movementUtils";
import { useInput } from "src/hooks/character/useInput";

type Props = {
  model: GLTFResult;
};

export default function useMovement({ model }: Props) {
  const positionRef = useRef(generateInitialPosition());
  const elapsedTimeRef = useRef(0);

  const [cameraCharacterAngleY, setCameraCharacterAngleY] = useState<number>(0);
  const input = useInput();

  const camera = useThree((state) => state.camera);
  const { animations, scene } = model;
  const { actions } = useAnimations<any>(animations, scene);

  const { action } = useActions({ actions, input });

  useDispatchMovement({
    positionRef,
    cameraCharacterAngleY,
    input,
  });

  useEffect(() => {
    const { x, y, z } = positionRef.current;
    const { cameraPositionX, cameraPositionY, cameraPositionZ } =
      getCameraPosition(x, z);
    camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
    const reverseCameraDrection = new THREE.Vector3(
      -cameraPositionX,
      model.scene.position.y,
      -cameraPositionZ,
    );
    model.scene.position.set(x, y, z);
    model.scene.lookAt(reverseCameraDrection);
  }, [camera, model.scene, positionRef]);

  useFrame((_, delta) => {
    elapsedTimeRef.current += delta;
    const currentAngle = calculateCameraToModelDirectionAngle(
      camera.position,
      model.scene.position,
    );

    if (
      elapsedTimeRef.current >= DEBOUNCE &&
      currentAngle !== cameraCharacterAngleY
    ) {
      setCameraCharacterAngleY(currentAngle);
      elapsedTimeRef.current = 0;
    }

    // move
    if (action === actionNames.walk) {
      const offset = directionOffset(input);
      const rotateQuaternion = getRotateQuaternion(currentAngle, offset);

      const direction = getDirection(currentAngle, offset);

      const newCharacterPosition = calcNewCharacterPos(
        direction,
        delta,
        positionRef.current,
      );
      const newCameraPosition = calcNewCameraPos(
        direction,
        delta,
        positionRef.current,
        camera.position,
      );

      model.scene.quaternion.rotateTowards(rotateQuaternion, FADE_IN);
      model.scene.position.set(
        newCharacterPosition.x,
        newCharacterPosition.y,
        newCharacterPosition.z,
      );
      camera.position.set(
        newCameraPosition.x,
        newCameraPosition.y,
        newCameraPosition.z,
      );

      positionRef.current = newCharacterPosition;
    }
  });

  return { positionRef };
}
