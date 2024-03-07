import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { RefObject, useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  positionRef: RefObject<{ x: number; y: number; z: number }>;
};

const CONTROLER_HEIGHT_DIFFRENCE = 2;
export default function OrbitControl({ positionRef }: Props) {
  const orbitControlsRef = useRef<any>();

  useFrame((_, $) => {
    if (positionRef.current) {
      const { x, y, z } = positionRef.current;
      orbitControlsRef.current.target = new THREE.Vector3(
        x,
        y + CONTROLER_HEIGHT_DIFFRENCE,
        z,
      );
    }
  });

  useEffect(() => {
    orbitControlsRef.current.target.copy(positionRef.current);
  }, [positionRef]);

  return (
    <OrbitControls
      ref={orbitControlsRef}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
    />
  );
}
