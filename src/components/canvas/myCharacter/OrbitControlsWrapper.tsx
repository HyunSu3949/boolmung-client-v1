import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { CONTROLER_HEIGHT_DIFFRENCE } from "src/utils/character/constants";
import { useCharacterPosition } from "src/components/canvas/myCharacter/CharacterContext";

export default function OrbitControlsWrapper() {
  const orbitControlsRef = useRef<any>();
  const positionRef = useCharacterPosition();
  useFrame(() => {
    const { x, y, z } = positionRef.current;
    orbitControlsRef.current.target = new THREE.Vector3(
      x,
      y + CONTROLER_HEIGHT_DIFFRENCE,
      z,
    );
  });

  return (
    <OrbitControls
      ref={orbitControlsRef}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
    />
  );
}
