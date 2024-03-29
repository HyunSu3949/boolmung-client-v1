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
  _id: number;
  max: number;
  title: string;
  owner: any;
  createdAt: Date;
  participants: {
    user: any;
    joinedAt: Date;
  }[];
  password?: string | undefined;
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
  _id: string;
  name: string;
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

export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type Input = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

export type Position = {
  x: number;
  y: number;
  z: number;
};
export type BaseModalType = {
  onCloseModal: () => void;
  props?: {
    message: string;
  };
};
export type ModalId =
  | "confirmModal"
  | "signupModal"
  | "errorModal"
  | "createChatModal"
  | "exitModal";
