import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import {
  directionOffset,
  generateInitialPosition,
  roundToTwoDecimal,
} from "src/components/canvas/utils";
import { useInput } from "src/components/canvas/myCharacter.tsx/useInput";
import { ActionName, GLTFResult } from "src/types/index";

const MODEL_SCALE = 1.2;
const CAMERE_MODEL_DISTANCE = 5;
const DEBOUNCE = 0.3;
const SPEED = 1.5;
const MID_EMPTY_SIZE = 3.5;
const MAX_MAP_SIZE = 20;

type Props = {
  model: GLTFResult;
  positionRef: any;
  actions: any;
};

export default function useMovement({ model, positionRef, actions }: Props) {
  const actionRef = useRef("");
  const elapsedTime = useRef(0);
  const [cameraCharacterAngleY, setCameraCharacterAngleY] = useState<number>(0);
  const { forward, backward, left, right } = useInput();
  const camera = useThree((state) => state.camera);

  // 모델 초기 상태 세팅
  useEffect(() => {
    // 모델 포지션, 위치 세팅
    model.scene.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);
    const { x, y, z } = positionRef.current;
    model.scene.position.set(x, y, z);

    // 카메라 포지션 세팅
    const angle = Math.atan2(x, z);
    model.scene.rotation.y = -angle;
    const cameraPositionX = x + Math.sin(angle) * CAMERE_MODEL_DISTANCE;
    const cameraPositionZ = z + Math.cos(angle) * CAMERE_MODEL_DISTANCE;
    camera.position.set(cameraPositionX, 1, cameraPositionZ);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 모델이 처음에 카메라를 바라보도록 세팅
    const reverseCameraDrection = new THREE.Vector3(
      -cameraPositionX,
      model.scene.position.y,
      -cameraPositionZ,
    );
    model.scene.lookAt(reverseCameraDrection);
  }, [camera, model.scene, positionRef]);

  // 움직일때 엑션 상태 세팅
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
  }, [actions, backward, forward, left, right]);

  useFrame((_, delta) => {
    elapsedTime.current += delta;

    if (actionRef.current === "walk") {
      // 카메라 각 설정
      const currentAngle = roundToTwoDecimal(
        Math.atan2(
          camera.position.x - model.scene.position.x,
          camera.position.z - model.scene.position.z,
        ),
      );
      // 카메라 각 움직임시 값 세팅
      if (
        elapsedTime.current >= DEBOUNCE &&
        currentAngle !== cameraCharacterAngleY
      ) {
        setCameraCharacterAngleY(
          roundToTwoDecimal(
            Math.atan2(
              camera.position.x - model.scene.position.x,
              camera.position.z - model.scene.position.z,
            ),
          ),
        );
        elapsedTime.current = 0;
      }

      const newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right,
      });

      const rotateAxis = new THREE.Vector3(0, 1, 0);
      const rotateQuarternion = new THREE.Quaternion();

      rotateQuarternion.setFromAxisAngle(
        rotateAxis,
        currentAngle + newDirectionOffset,
      );

      model.scene.quaternion.rotateTowards(rotateQuarternion, 0.2);

      // 카메라와 캐릭터의 atan2 값으로 방향백터(move 방향)를 구함
      const direction = new THREE.Vector3(
        Math.sin(currentAngle),
        0,
        Math.cos(currentAngle),
      );
      direction.applyAxisAngle(rotateAxis, newDirectionOffset);

      // 캐릭터 위치 이동 구현
      const moveX = -direction.x * SPEED * delta;
      const moveZ = -direction.z * SPEED * delta;
      const newX = positionRef.current.x + moveX;
      const newZ = positionRef.current.z + moveZ;

      // 캐릭터 위치 제한
      if (
        !(
          newX > -MID_EMPTY_SIZE &&
          newX < MID_EMPTY_SIZE &&
          newZ > -MID_EMPTY_SIZE &&
          newZ < MID_EMPTY_SIZE
        ) &&
        newX >= -MAX_MAP_SIZE &&
        newX <= MAX_MAP_SIZE &&
        newZ >= -MAX_MAP_SIZE &&
        newZ <= MAX_MAP_SIZE
      ) {
        positionRef.current = { x: newX, z: newZ, y: 0 };
        model.scene.position.x = positionRef.current.x;
        model.scene.position.z = positionRef.current.z;
        camera.position.x += moveX;
        camera.position.z += moveZ;
      }
    }
  });
  console.log("리렌더링");

  return {
    keyBoardInput: { forward, backward, left, right },
    cameraCharacterAngleY,
  };
}
