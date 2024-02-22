import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { GLTFResult, ActionName } from "src/types";
import {
  directionOffset,
  roundToTwoDecimal,
  generateInitialPosition,
} from "./utils";
import { useInput } from "./useInput";
import { RootState } from "src/redux/store";
import { move } from "src/redux/features/socketSlice";

const walkDirection = new THREE.Vector3();
const rotateAxis = new THREE.Vector3(0, 1, 0);
const rotateQuarternion = new THREE.Quaternion();
const cameraTarget = new THREE.Vector3();

export function Character() {
  const { roomid } = useParams();
  const positionRef = useRef({ x: 0, y: 0, z: 0 });
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const [cameraCharacterAngleY, setCameraCharacterAngleY] = useState<number>(0);
  const currentAction = useRef("");
  const controlsRef = useRef<any>();

  const model = useGLTF("/models/player7.glb") as GLTFResult;
  const bodyTexture = useLoader(THREE.TextureLoader, "/img/body.png");
  const faceTexture = useLoader(THREE.TextureLoader, user.image);

  const camera = useThree((state) => state.camera);
  const { animations, scene } = model;
  const { actions } = useAnimations<any>(animations, scene);

  const { forward, backward, left, right } = useInput();
  useEffect(() => {
    model.scene.scale.set(1.2, 1.2, 1.2);
    faceTexture.flipY = false;
    bodyTexture.flipY = false;
    const faceMaterial = model.materials.face;
    if (faceMaterial) {
      faceMaterial.map = faceTexture;
      faceMaterial.needsUpdate = true;
    }
    const bodyMaterial = model.materials["Material.001"];
    if (bodyMaterial) {
      bodyMaterial.map = bodyTexture;
      bodyMaterial.needsUpdate = true;
    }
    const initialPosition = generateInitialPosition();
    model.scene.position.x = initialPosition.x;
    model.scene.position.z = initialPosition.z;
  }, [
    bodyTexture,
    faceTexture,
    model.materials,
    model.scene.position,
    faceTexture.image.currentSrc,
    model.scene.scale,
  ]);

  const updateCameraTarget = (moveX: number, moveZ: number) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;

    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y + 2;
    cameraTarget.z = model.scene.position.z;
    if (controlsRef.current) controlsRef.current.target = cameraTarget;
  };

  const dispatch = useDispatch();
  useEffect(() => {
    let action: ActionName = "";
    if (forward || backward || left || right) {
      action = "walk";
    } else {
      action = "default";
    }

    if (currentAction.current !== action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
    if (roomid) {
      dispatch(
        move({
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
  ]);

  const elapsedTime = useRef(0);

  useFrame((_, delta) => {
    elapsedTime.current += delta;

    if (currentAction.current === "walk") {
      const currentAngle = roundToTwoDecimal(
        Math.atan2(
          camera.position.x - model.scene.position.x,
          camera.position.z - model.scene.position.z,
        ),
      );

      if (
        elapsedTime.current >= 0.3 &&
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

      rotateQuarternion.setFromAxisAngle(
        rotateAxis,
        currentAngle + newDirectionOffset,
      );

      model.scene.quaternion.rotateTowards(rotateQuarternion, 0.2);

      camera.getWorldDirection(walkDirection);

      // 카메라와 캐릭터의 atan2 값으로 방향백터(move 방향)를 구함
      const direction = new THREE.Vector3(
        Math.sin(currentAngle),
        0,
        Math.cos(currentAngle),
      );
      direction.applyAxisAngle(rotateAxis, newDirectionOffset);

      const moveX = -direction.x * 1.5 * delta;
      const moveZ = -direction.z * 1.5 * delta;

      const newX = model.scene.position.x + moveX;
      const newZ = model.scene.position.z + moveZ;
      positionRef.current = { x: newX, z: newZ, y: 0 };
      if (!(newX > -2.5 && newX < 2.5 && newZ > -2.5 && newZ < 2.5)) {
        model.scene.position.x = newX;
        model.scene.position.z = newZ;
        updateCameraTarget(moveX, moveZ);
      }
    }
  });

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <primitive object={scene} rotation={[0, -Math.PI / 2, 0]} />
    </>
  );
}

useGLTF.preload("/models/player7.glb");
