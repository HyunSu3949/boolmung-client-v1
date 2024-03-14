import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { setDirectionInput } from "src/redux/features/actionSlice";
import { Input } from "src/types/index";

export const useInput = () => {
  const [input, setInput] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const keys: Record<string, keyof Input> = useMemo(
    () => ({
      KeyW: "forward",
      KeyS: "backward",
      KeyA: "left",
      KeyD: "right",
    }),
    [],
  );

  const dispatch = useDispatch();
  const findKey = useCallback((key: string) => keys[key], [keys]);

  useEffect(() => {
    const activeKeys = new Set();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!keys[e.code] || activeKeys.has(e.code)) return;

      const action = findKey(e.code);
      setInput((prev: any) => ({ ...prev, [action]: true }));
      dispatch(setDirectionInput({ [action]: true }));
      activeKeys.add(e.code);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!keys[e.code]) return;

      const action = findKey(e.code);
      setInput((prev: any) => ({ ...prev, [action]: false }));
      dispatch(setDirectionInput({ [action]: false }));
      activeKeys.delete(e.code);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [dispatch, findKey, keys]);

  return input;
};
