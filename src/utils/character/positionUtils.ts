import { MAX_MAP_SIZE, MID_EMPTY_SIZE } from "./constants";

export const generateInitialPosition = () => {
  let x;
  let z;

  do {
    x = Math.random() * 8 - 4;
    z = Math.random() * 8 - 4;
  } while (
    (x > -MID_EMPTY_SIZE + 0.1 && x < MID_EMPTY_SIZE + 0.1) ||
    (z > -MID_EMPTY_SIZE + 0.1 && z < MID_EMPTY_SIZE + 0.1)
  );

  return { x, y: 0, z };
};

export const isOutsideMiddleEmptyArea = (x: number, z: number) => {
  return (
    x > -MID_EMPTY_SIZE &&
    x < MID_EMPTY_SIZE &&
    z > -MID_EMPTY_SIZE &&
    z < MID_EMPTY_SIZE
  );
};

export const isInMapBounds = (x: number, z: number) => {
  return (
    x >= -MAX_MAP_SIZE &&
    x <= MAX_MAP_SIZE &&
    z >= -MAX_MAP_SIZE &&
    z <= MAX_MAP_SIZE
  );
};
