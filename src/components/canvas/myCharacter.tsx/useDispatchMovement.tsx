import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { sendMove } from "src/redux/features/socketActions";
import { RootState } from "src/redux/store";

export default function useDispatchMovement({
  positionRef,
  actions,
  cameraCharacterAngleY,
  keyBoardInput,
}: any) {
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
    actions,
    dispatch,
    user,
    roomid,
    positionRef,
  ]);
}
