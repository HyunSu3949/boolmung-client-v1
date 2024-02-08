import { Canvas } from "@react-three/fiber";

import { Fire } from "../common/fire";
import { Floor } from "../common/Floor";
import { Lights } from "../common/Light";
import { Character } from "../character/Character";
import { Others } from "../character/Others";
import { Wood } from "../common/Wood";

export function ChatScene({ actionInfo, chatSocketRef }: any) {
  return (
    <Canvas camera={{ position: [0, 1, 9], fov: 90 }}>
      <Fire scale={5} position={[0, 2.0, 0]} />
      <Wood />
      <Character />
      <Others actionInfo={actionInfo} />
      <Floor />
      <Lights />
    </Canvas>
  );
}