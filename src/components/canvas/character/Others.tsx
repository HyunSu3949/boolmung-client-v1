import { useGLTF } from "@react-three/drei";
import { useSelector } from "react-redux";

import { RootState } from "src/redux/store";
import { GLTFResult } from "src/types/index";

import { OtherCharacter } from "./OtherCharacter";

export function Others({ actionInfo }: any) {
  const model = useGLTF("/models/player7.glb") as GLTFResult;
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const othersInfo = Object.entries(actionInfo).filter(
    (data: any) => data[1].userId !== user?._id,
  );

  const characters = othersInfo.map((data: any) => {
    const [socketId, state] = data;

    return <OtherCharacter key={state.userId} model={model} state={state} />;
  });
  return { characters };
}

useGLTF.preload("/models/player7.glb");
