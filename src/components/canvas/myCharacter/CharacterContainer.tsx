import { useRef } from "react";
import { useSelector } from "react-redux";

import { RootState } from "src/redux/store";
import { Character } from "src/components/canvas/myCharacter/Character";
import { useInput } from "src/hooks/character/useInput";
import { generateInitialPosition } from "src/utils/character/positionUtils";
import useCameraAngle from "src/hooks/character/useCameraAngle";
import OrbitControlsWrapper from "src/components/canvas/myCharacter/OrbitControlsWrapper";
import useCameraMove from "src/hooks/character/useCameraMove";
import { CharacterProvider } from "src/components/canvas/myCharacter/CharacterContext";

export default function CharacterContainer() {
  return (
    <CharacterProvider>
      <>
        <Character />
        <OrbitControlsWrapper />
      </>
    </CharacterProvider>
  );
}
