import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect } from "react";

import useAction from "src/hooks/character/useAction";
import { Input, Position } from "src/types/index";
import { getCameraPosition } from "src/utils/character/cameraUtils";
import { actionNames } from "src/utils/character/constants";
import {
  calcNewCameraPos,
  directionOffset,
  getDirection,
} from "src/utils/character/movementUtils";

type Props = {
  input: Input;
  positionRef: React.MutableRefObject<Position>;
  cameraAngle: number;
};

export default function useCameraMove({
  input,
  positionRef,
  cameraAngle,
}: Props) {
  const camera = useThree((state) => state.camera);
  const currentAction = useAction({ input });

  useEffect(() => {
    const { x, z } = positionRef.current;
    const { cameraPositionX, cameraPositionY, cameraPositionZ } =
      getCameraPosition(x, z);
    camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
  }, [camera, positionRef]);

  useFrame((_, delta) => {
    if (currentAction === actionNames.walk) {
      const offset = directionOffset(input);
      const direction = getDirection(cameraAngle, offset);
      const newCameraPosition = calcNewCameraPos(
        direction,
        delta,
        positionRef.current,
        camera.position,
      );
      camera.position.set(
        newCameraPosition.x,
        newCameraPosition.y,
        newCameraPosition.z,
      );
    }
  });
}
