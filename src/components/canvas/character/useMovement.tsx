import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useInput } from "src/components/canvas/character/useInput";
import { sendMove } from "src/redux/features/socketActions";
import { RootState } from "src/redux/store";
import { ActionName } from "src/types/index";

export default function useMovement({
  positionRef,
  actions,
  cameraCharacterAngleY,
}: any) {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const { forward, backward, left, right } = useInput();
  const { roomid } = useParams();
  const dispatch = useDispatch();
  const actionRef = useRef("");

  useEffect(() => {
    let action: ActionName = "";
    if (forward || backward || left || right) {
      action = "walk";
    } else {
      action = "default";
    }

    if (actionRef.current !== action) {
      const nextActionToPlay = actions[action];
      const current = actions[actionRef.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      actionRef.current = action;
    }
    if (roomid) {
      dispatch(
        sendMove({
          _id: user._id,
          roomId: roomid,
          input: { forward, backward, left, right },
          position: positionRef.current,
          cameraCharacterAngleY,
          image: user.image,
        }),
      );
    }
  }, [
    forward,
    backward,
    left,
    right,
    cameraCharacterAngleY,
    actions,
    dispatch,
    user,
    roomid,
    positionRef,
  ]);

  return { forward, backward, left, right, actionRef };
}
