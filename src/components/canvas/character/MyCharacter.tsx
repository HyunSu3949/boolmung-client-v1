import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useInput } from "./useInput";
import { useFrame, useThree } from "@react-three/fiber";
import { useParams } from "react-router-dom";
import { useAuth } from "../../common/Context/AuthContext";
import {
  directionOffset,
  roundToTwoDecimal,
  generateInitialPosition,
} from "./utils";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.SkinnedMesh;
    Bone: THREE.Bone;
    Bone003: THREE.Bone;
    Bone005: THREE.Bone;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

type ActionName = "default" | "walk" | "";

let walkDirection = new THREE.Vector3();
let rotateAxis = new THREE.Vector3(0, 1, 0);
let rotateQuarternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

export const MyCharacter = ({ chatSocket }: any) => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const { forward, backward, left, right } = useInput();
  const camera = useThree((state) => state.camera);

  const [cameraCharacterAngleY, setCameraCharacterAngleY] = useState<number>(0);
  const currentAction = useRef("");
  const controlsRef = useRef<any>();

  const model = useGLTF("/models/player.glb") as GLTFResult;
  model.scene.scale.set(1.2, 1.2, 1.2);

  const { animations, scene } = model;
  const { actions } = useAnimations<any>(animations, scene);

  const updateCameraTarget = (moveX: number, moveZ: number) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;

    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y + 2;
    cameraTarget.z = model.scene.position.z;
    if (controlsRef.current) controlsRef.current.target = cameraTarget;
  };

  useEffect(() => {
    const initialPosition = generateInitialPosition();
    model.scene.position.x = initialPosition.x;
    model.scene.position.z = initialPosition.z;

    console.log(initialPosition.x, initialPosition.z);
  }, []);

  useEffect(() => {
    let action: ActionName = "";

    if (forward || backward || left || right) {
      action = "walk";
    } else {
      action = "default";
    }

    if (currentAction.current != action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }

    chatSocket.emit("move", {
      roomId: id,
      userId: currentUser._id,
      input: { forward, backward, left, right },
      position: [
        model.scene.position.x,
        model.scene.position.y,
        model.scene.position.z,
      ],
      cameraCharacterAngleY,
    });
  }, [forward, backward, left, right, cameraCharacterAngleY]);

  const elapsedTime = useRef(0);
  useFrame((_, delta) => {
    elapsedTime.current += delta;

    if (currentAction.current == "walk") {
      const currentAngle = roundToTwoDecimal(
        Math.atan2(
          camera.position.x - model.scene.position.x,
          camera.position.z - model.scene.position.z
        )
      );

      if (
        elapsedTime.current >= 0.3 &&
        currentAngle !== cameraCharacterAngleY
      ) {
        setCameraCharacterAngleY(
          roundToTwoDecimal(
            Math.atan2(
              camera.position.x - model.scene.position.x,
              camera.position.z - model.scene.position.z
            )
          )
        );
        elapsedTime.current = 0;
      }

      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right,
      });

      rotateQuarternion.setFromAxisAngle(
        rotateAxis,
        currentAngle + newDirectionOffset
      );

      model.scene.quaternion.rotateTowards(rotateQuarternion, 0.2);

      camera.getWorldDirection(walkDirection);

      //카메라와 캐릭터의 atan2 값으로 방향백터(move 방향)를 구함
      let direction = new THREE.Vector3(
        Math.sin(currentAngle),
        0,
        Math.cos(currentAngle)
      );
      direction.applyAxisAngle(rotateAxis, newDirectionOffset);

      const moveX = -direction.x * 2 * delta;
      const moveZ = -direction.z * 2 * delta;

      const newX = model.scene.position.x + moveX;
      const newZ = model.scene.position.z + moveZ;

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
      <primitive object={scene} />
    </>
  );
};

useGLTF.preload("/models/player.glb");
