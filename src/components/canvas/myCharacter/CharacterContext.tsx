import React, { createContext, useContext, useRef } from "react";

import { Position } from "src/types/index";
import { generateInitialPosition } from "src/utils/character/positionUtils";

type Props = {
  children: React.ReactElement;
};

const CharacterContext = createContext<React.MutableRefObject<Position> | null>(
  null,
);

export function CharacterProvider({ children }: Props) {
  const positionRef = useRef(generateInitialPosition());

  return (
    <CharacterContext.Provider value={positionRef}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacterPosition() {
  const value = useContext(CharacterContext);
  if (!value) {
    throw new Error("컨텍스트 바깥에서 사용할수 없습니다.");
  }
  return value;
}
