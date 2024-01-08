import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Fire } from "./fire/fire";
import { Floor } from "./common/Floor";
import { Lights } from "./common/Light";
import { MyCharacter } from "./character/MyCharacter";
import { Others } from "./character/Others";
import { Wood } from "./fire/Wood";

export const ChatScene = ({ actionInfo, chatSocket }: any) => {
  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 90 }}>
      <Suspense fallback={null}>
        <Fire scale={7} position={[0, 2.5, 0]} />
        <Wood />
      </Suspense>
      <MyCharacter chatSocket={chatSocket} />
      <Others actionInfo={actionInfo} />
      <Floor />
      <Lights />
    </Canvas>
  );
};
