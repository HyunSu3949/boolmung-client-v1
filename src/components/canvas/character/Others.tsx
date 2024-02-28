import { useGLTF } from "@react-three/drei";
import { useSelector } from "react-redux";

import { RootState } from "src/redux/store";

import { OtherCharacter } from "./OtherCharacter";

export function Others() {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const { actionInfo, positions } = useSelector(
    (state: RootState) => state.reducer.socketReducer,
  );
  const othersInfo = Object.entries(actionInfo).filter(
    ([_id, value]) => value._id !== user?._id,
  );

  return (
    <>
      {othersInfo.map(([_id, info]) => {
        return (
          <OtherCharacter
            key={_id}
            state={info}
            image={info.image}
            initialPos={positions[_id]}
          />
        );
      })}
    </>
  );
}

useGLTF.preload("/models/player7.glb");
