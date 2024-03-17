import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { sendMove } from "src/redux/features/socketActions";
import { RootState } from "src/redux/store";
import { Input, Position } from "src/types/index";

type Props = {
  positionRef: React.MutableRefObject<Position>;
  cameraAngle: number;
  input: Input;
};

export default function useDispatchMovement({
  positionRef,
  cameraAngle,
  input,
}: Props) {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const { roomid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (roomid) {
      dispatch(
        sendMove({
          _id: user._id,
          image: user.image,
          roomId: roomid,
          input,
          position: positionRef.current,
          cameraCharacterAngleY: cameraAngle,
        }),
      );
    }
  }, [input, cameraAngle, dispatch, user, roomid, positionRef]);
}
