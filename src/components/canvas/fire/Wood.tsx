import React from "react";
import { useGLTF } from "@react-three/drei";

export const Wood = () => {
  const model = useGLTF("/models/wood.glb");
  model.scene.position.y = -0.5;
  return (
    <>
      <primitive object={model.scene} />
    </>
  );
};
