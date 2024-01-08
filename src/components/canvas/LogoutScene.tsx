import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Fire } from "./fire/fire";
import { Floor } from "./common/Floor";
import { Lights } from "./common/Light";
import { Wood } from "./fire/Wood";

export default function LogoutScene() {
  return (
    <Canvas camera={{ position: [0, 1, 10], fov: 90 }}>
      <Suspense fallback={null}>
        <Fire scale={7} position={[0, 3.0, 0]} />
        <Wood />
      </Suspense>
      <Floor />
      <Lights />
    </Canvas>
  );
}
