type directionOffsetType = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

export const directionOffset = ({
  forward,
  backward,
  left,
  right,
}: directionOffsetType) => {
  let directionOffset = 0; //기본 w

  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4; //w+a ,45도 전환
    } else if (right) {
      directionOffset = -Math.PI / 4;
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2; //s+a
    } else if (right) {
      directionOffset = -Math.PI / 4 + -Math.PI / 2;
    } else {
      directionOffset = Math.PI; //s
    }
  } else if (left) {
    directionOffset = Math.PI / 2; //a
  } else if (right) {
    directionOffset = -Math.PI / 2; //d
  }

  return directionOffset;
};

export const roundToTwoDecimal = (number: number) => {
  if (Math.abs(number) < 0.01) return 0;

  return parseFloat(number.toFixed(2));
};

export const generateInitialPosition = () => {
  let x, z;

  do {
    x = Math.random() * 8 - 4;
    z = Math.random() * 8 - 4;
  } while ((x > -2 && x < 2) || (z > -2 && z < 2));

  return { x, z };
};
