import * as THREE from "three";

import { CAMERE_MODEL_DISTANCE, DEFAULT_CAMERA_Y } from "./constants";
import { Position } from "src/types/index";

export const roundToTwoDecimal = (number: number) => {
  if (Math.abs(number) < 0.01) return 0;

  return parseFloat(number.toFixed(2));
};
export const getCameraAngle = (x: number, z: number) => Math.atan2(x, z);
export const getCameraPosition = (x: number, z: number) => {
  const angle = Math.atan2(x, z);
  const cameraPositionX = x + Math.sin(angle) * CAMERE_MODEL_DISTANCE;
  const cameraPositionZ = z + Math.cos(angle) * CAMERE_MODEL_DISTANCE;

  return {
    cameraPositionX,
    cameraPositionY: DEFAULT_CAMERA_Y,
    cameraPositionZ,
  };
};

export const calculateCameraToModelDirectionAngle = (
  cameraPosition: { x: number; y: number; z: number },
  modelPosition: { x: number; y: number; z: number },
) => {
  return roundToTwoDecimal(
    getCameraAngle(
      cameraPosition.x - modelPosition.x,
      cameraPosition.z - modelPosition.z,
    ),
  );
};
