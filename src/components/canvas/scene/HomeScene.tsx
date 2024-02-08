import { Canvas } from "@react-three/fiber";

import { Character } from "src/components/canvas/character/Character";

import { Fire } from "../common/fire";
import { Floor } from "../common/Floor";
import { Lights } from "../common/Light";
import { Wood } from "../common/Wood";

export default function HomeScene() {
  return (
    <Canvas camera={{ position: [0, 1, 10], fov: 90 }}>
      <Fire scale={7} position={[0, 3.0, 0]} />
      <Wood />
      <Floor />
      <Lights />
      <Character />
    </Canvas>
  );
}
