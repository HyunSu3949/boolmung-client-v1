import React from "react";
import { useGLTF } from "@react-three/drei";

export function Wood() {
  const model = useGLTF("/models/woodStack.glb");
  model.scene.position.y = -0.5;
  return (
    <primitive object={model.scene} scale={1.5}>
      <meshPhongMaterial color="gray" />
    </primitive>
  );
}
