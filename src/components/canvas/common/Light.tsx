import React, { useRef } from "react";

export const Lights = () => {
  const lightRef = useRef<any>();

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight
        ref={lightRef}
        position={[0, 1, 0]}
        intensity={0.7}
        color={"#ff9329"}
        castShadow
      />
    </>
  );
};
