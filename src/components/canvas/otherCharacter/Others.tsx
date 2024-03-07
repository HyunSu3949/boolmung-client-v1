import { useGLTF } from "@react-three/drei";
import { useSelector } from "react-redux";

import { RootState } from "src/redux/store";

import { OtherCharacter } from "./OtherCharacter";

export function Others() {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const actionInfo = useSelector(
    (state: RootState) => state.reducer.socketReducer.actionInfo,
  );

  const othersInfo = Object.entries(actionInfo).filter(([_id, _]) => {
    return _id !== user._id && _id !== undefined;
  });

  return (
    <>
      {othersInfo.map(([_id, info]) => {
        return <OtherCharacter key={_id} state={info} image={info.image} />;
      })}
    </>
  );
}

useGLTF.preload("/models/player7.glb");
