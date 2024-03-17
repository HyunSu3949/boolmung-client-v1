import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";

import { Position } from "src/types/index";
import { calculateCameraToModelDirectionAngle } from "src/utils/character/cameraUtils";
import { DEBOUNCE } from "src/utils/character/constants";

type Props = {
  positionRef: React.MutableRefObject<Position>;
};
export default function useCameraAngle({ positionRef }: Props) {
  const [cameraCharacterAngleY, setCameraCharacterAngleY] = useState<number>(0);
  const camera = useThree((state) => state.camera);

  const elapsedTimeRef = useRef(0);
  useFrame((_, delta) => {
    elapsedTimeRef.current += delta;
    const currentAngle = calculateCameraToModelDirectionAngle(
      camera.position,
      positionRef.current,
    );

    if (
      elapsedTimeRef.current >= DEBOUNCE &&
      currentAngle !== cameraCharacterAngleY
    ) {
      setCameraCharacterAngleY(currentAngle);
      elapsedTimeRef.current = 0;
    }
  });

  return cameraCharacterAngleY;
}
