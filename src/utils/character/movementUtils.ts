import * as THREE from "three";

import { Input, Position } from "src/types/index";
import { SPEED } from "src/utils/character/constants";
import {
  isInMapBounds,
  isOutsideMiddleEmptyArea,
} from "src/utils/character/positionUtils";

export const directionOffset = ({ forward, backward, left, right }: Input) => {
  let directionOffset = 0; // 기본 w

  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4; // w+a ,45도 전환
    } else if (right) {
      directionOffset = -Math.PI / 4;
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
    } else if (right) {
      directionOffset = -Math.PI / 4 + -Math.PI / 2;
    } else {
      directionOffset = Math.PI; // s
    }
  } else if (left) {
    directionOffset = Math.PI / 2; // a
  } else if (right) {
    directionOffset = -Math.PI / 2; // d
  }

  return directionOffset;
};

export const getRotateQuaternion = (angle: number, offset: number) => {
  const rotateAxis = new THREE.Vector3(0, 1, 0);
  const rotateQuaternion = new THREE.Quaternion();
  rotateQuaternion.setFromAxisAngle(rotateAxis, angle + offset);
  return rotateQuaternion;
};

export const getDirection = (currentAngle: number, offset: number) => {
  const direction = new THREE.Vector3(
    Math.sin(currentAngle),
    0,
    Math.cos(currentAngle),
  );
  direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), offset);

  return direction;
};

export const calcNewCharacterPos = (
  direction: THREE.Vector3,
  delta: number,
  currentPosition: {
    x: number;
    y: number;
    z: number;
  },
) => {
  const moveX = -direction.x * SPEED * delta;
  const moveZ = -direction.z * SPEED * delta;
  const newX = currentPosition.x + moveX;
  const newZ = currentPosition.z + moveZ;

  if (!isOutsideMiddleEmptyArea(newX, newZ) && isInMapBounds(newX, newZ))
    return { x: newX, y: 0, z: newZ };
  return currentPosition;
};
export const calcNewCameraPos = (
  direction: THREE.Vector3,
  delta: number,
  characterPosition: Position,
  currentPosition: Position,
) => {
  const moveX = -direction.x * SPEED * delta;
  const moveZ = -direction.z * SPEED * delta;
  const newX = characterPosition.x + moveX;
  const newZ = characterPosition.z + moveZ;

  if (!isOutsideMiddleEmptyArea(newX, newZ) && isInMapBounds(newX, newZ))
    return {
      x: currentPosition.x + moveX,
      y: currentPosition.y,
      z: currentPosition.z + moveZ,
    };
  return currentPosition;
};
