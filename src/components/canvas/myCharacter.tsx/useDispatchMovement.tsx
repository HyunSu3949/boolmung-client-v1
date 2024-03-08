import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { sendMove } from "src/redux/features/socketActions";
import { RootState } from "src/redux/store";

type Props = {
  positionRef: React.MutableRefObject<{
    x: number;
    y: number;
    z: number;
  }>;
  cameraCharacterAngleY: number;
  keyBoardInput: Record<string, boolean>;
};

export default function useDispatchMovement({
  positionRef,
  cameraCharacterAngleY,
  keyBoardInput,
}: Props) {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const { roomid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const { forward, backward, left, right } = keyBoardInput;
    if (roomid) {
      dispatch(
        sendMove({
          _id: user._id,
          image: user.image,
          roomId: roomid,
          input: { forward, backward, left, right },
          position: positionRef.current,
          cameraCharacterAngleY,
        }),
      );
    }
  }, [
    keyBoardInput,
    cameraCharacterAngleY,
    dispatch,
    user,
    roomid,
    positionRef,
  ]);
}
