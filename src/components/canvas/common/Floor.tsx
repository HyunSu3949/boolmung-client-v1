import React, { useMemo } from "react";
import { TextureLoader, RepeatWrapping } from "three";

export const Floor = () => {
  const texture = useMemo(() => {
    const loader = new TextureLoader();
    return loader.load("/img/floortex.jpg", (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(8, 8);
    });
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial color={"#654321"} map={texture} />
    </mesh>
  );
};
