import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export type GLTFResult = GLTF & any;
export type ActionName = "default" | "walk" | "";
export type Chat = {
  _id: string;
  type: "system" | "mine" | "others" | undefined;
  name: string;
  message: string;
};

export type CharacterMovementData = {
  userId: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
    w: number;
  };
  actionState: ActionName;
};

export type RoomInfo = {
  _id: string;
  owner: string;
  title: string;
  max: number;
  participants: string[];
};

export type User = {
  [key: string]: any;
  image: string;
  // _id: string;
  // name: string;
};
export type AuthState = {
  isLoggedIn: boolean;
  user: User;
};
export type SocketSendMessage = {
  _id: string;
  message: string;
  roomId: string;
  name: string;
};
export type SocketReceiveMessage = {
  [key: string]: any;
  message: string;
  type: string;
};
export type SocketUserInfo = {
  _id: string;
  roomId: string;
  name: string;
  image: string;
};

export type CreateRoomFormData = {
  title: string;
  max: number;
  owner: string;
};

export type ActionInfo = {
  _id: string;
  roomId: string;
  input: any;
  position: any;
  cameraCharacterAngleY: any;
  image: string;
};
