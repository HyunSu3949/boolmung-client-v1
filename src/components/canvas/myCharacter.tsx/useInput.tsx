import { useCallback, useEffect, useMemo, useState } from "react";

export const useInput = () => {
  const [input, setInput] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const keys: Record<string, string> = useMemo(
    () => ({
      KeyW: "forward",
      KeyS: "backward",
      KeyA: "left",
      KeyD: "right",
    }),
    [],
  );

  const findKey = useCallback((key: string) => keys[key], [keys]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const action = findKey(e.code);
      setInput((prev: any) =>
        prev[action] ? prev : { ...prev, [action]: true },
      );
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const action = findKey(e.code);
      setInput((prev: any) =>
        !prev[action] ? prev : { ...prev, [action]: false },
      );
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [findKey]);

  return input;
};
