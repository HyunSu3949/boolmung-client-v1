import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setActionState } from "src/redux/features/actionSlice";
import { ActionName } from "src/types/index";
import { FADE_IN, FADE_OUT } from "src/utils/character/constants";

export default function useActions({ actions, input }: any) {
  const [action, setAction] = useState<ActionName>("");
  const { forward, backward, left, right } = input;

  const dispatch = useDispatch();
  useEffect(() => {
    let nextAction: ActionName = "";
    if (forward || backward || left || right) {
      nextAction = "walk";
    } else {
      nextAction = "default";
    }

    if (action !== nextAction) {
      const nextActionToPlay = actions[nextAction];
      const currentAction = actions[action];

      currentAction?.fadeOut(FADE_OUT);
      nextActionToPlay?.reset().fadeIn(FADE_IN).play();
      dispatch(setActionState(nextAction));
      setAction(nextAction);
    }
  }, [action, setAction, backward, forward, left, right, actions, dispatch]);

  return { action };
}
