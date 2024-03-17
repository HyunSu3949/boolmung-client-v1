import { useEffect, useState } from "react";

import { ActionName, Input } from "src/types/index";

type Props = { input: Input };
export default function useAction({ input }: Props) {
  const [currentAction, setCurrentAction] = useState<ActionName>("");
  const { forward, backward, left, right } = input;
  useEffect(() => {
    let nextAction: ActionName = "";
    if (forward || backward || left || right) {
      nextAction = "walk";
    } else {
      nextAction = "default";
    }
    setCurrentAction(nextAction);
  }, [backward, forward, left, right]);

  return currentAction;
}
