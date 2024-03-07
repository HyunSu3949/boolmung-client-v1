import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useSelector } from "react-redux";

import { GLTFResult } from "src/types";
import {
  directionOffset,
  roundToTwoDecimal,
  generateInitialPosition,
} from "../utils";
import { RootState } from "src/redux/store";
import useMovement from "src/components/canvas/myCharacter.tsx/useMovement";
import OrbitControl from "src/components/canvas/myCharacter.tsx/OrbitControl";

const url = {
  face: "/img/defaultFace.png",
  body: "/img/body.png",
  model: "/models/player7.glb",
};
const BODY_MATERIAL = "Material.001";
const CONTROLER_HEIGHT_DIFFRENCE = 2;
const MID_EMPTY_SIZE = 3.5;
const MAX_MAP_SIZE = 20;
const MODEL_SCALE = 1.2;
const CAMERE_MODEL_DISTANCE = 5;
const SPEED = 1.5;
const DEBOUNCE = 0.3;

export function Character() {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);

  const orbitControlsRef = useRef<any>();
  const camera = useThree((state) => state.camera);
  const [cameraCharacterAngleY, setCameraCharacterAngleY] = useState<number>(0);

  const model = useGLTF(url.model) as GLTFResult;
  const { animations, scene } = model;
  const { actions } = useAnimations<any>(animations, scene);

  const positionRef = useRef(generateInitialPosition());
  const { forward, backward, left, right, actionRef } = useMovement({
    positionRef,
    actions,
    cameraCharacterAngleY,
  });
  useEffect(() => {
    // material 세팅
    const updateMaterial = (texture: any, materials: any) => {
      texture.flipY = false;
      materials.map = texture;
      materials.needsUpdate = true;
    };

    const loadTexture = async (
      materials: any,
      url: string,
      defaultUrl: string,
    ) => {
      try {
        const loader = new THREE.TextureLoader();
        const loadedTexture = await loader.loadAsync(url);
        if (loadedTexture) {
          updateMaterial(loadedTexture, materials);
        }
      } catch (e: any) {
        const loader = new THREE.TextureLoader();
        const defaultTexture = await loader.loadAsync(defaultUrl);
        if (defaultTexture) {
          updateMaterial(defaultTexture, materials);
        }
      }
    };

    loadTexture(model.materials.face, user.image, url.face);
    loadTexture(model.materials[BODY_MATERIAL], url.body, url.body);

    // 모델 포지션, 위치 세팅
    model.scene.scale.set(MODEL_SCALE, MODEL_SCALE, MODEL_SCALE);
    const { x, y, z } = positionRef.current;
    model.scene.position.set(x, y, z);

    // 카메라 포지션 세팅
    const angle = Math.atan2(model.scene.position.x, model.scene.position.z);
    model.scene.rotation.y = -angle;
    const cameraPositionX =
      model.scene.position.x + Math.sin(angle) * CAMERE_MODEL_DISTANCE;
    const cameraPositionZ =
      model.scene.position.z + Math.cos(angle) * CAMERE_MODEL_DISTANCE;
    camera.position.set(cameraPositionX, 1, cameraPositionZ);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 모델이 처음에 카메라를 바라보도록 세팅
    const reverseCameraDrection = new THREE.Vector3(
      -cameraPositionX,
      model.scene.position.y,
      -cameraPositionZ,
    );
    model.scene.lookAt(reverseCameraDrection);

    // 컨트롤러 세팅
    // orbitControlsRef.current.target.copy(positionRef.current);
  }, [camera, model, user.image]);

  const elapsedTime = useRef(0);
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
        const { x, y, z } = positionRef.current;
        // orbitControlsRef.current.target = new THREE.Vector3(
        //   x,
        //   y + CONTROLER_HEIGHT_DIFFRENCE,
        //   z,
        // );
      }
    }
  });

  return (
    <>
      {/* <OrbitControls
        ref={orbitControlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      /> */}
      <OrbitControl positionRef={positionRef} />
      <primitive object={scene} rotation={[0, Math.PI / 2, 0]} />
    </>
  );
}

useGLTF.preload("/models/player7.glb");
