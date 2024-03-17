import { Canvas } from "@react-three/fiber";

import CharacterContainer from "src/components/canvas/myCharacter/CharacterContainer";

import { Fire } from "../common/fire";
import { Floor } from "../common/Floor";
import { Lights } from "../common/Light";
import { Others } from "../otherCharacter/Others";
import { Wood } from "../common/Wood";

export function ChatScene() {
  return (
    <Canvas camera={{ position: [0, 1, 9], fov: 90 }}>
      <Fire scale={5} position={[0, 2.0, 0]} />
      <Wood />
      <CharacterContainer />
      <Others />
      <Floor />
      <Lights />
    </Canvas>
  );
}
