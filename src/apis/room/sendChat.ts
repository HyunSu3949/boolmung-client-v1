import axiosInstance from "../instance";

export const sendChat = async (
  roomId: string,
  name: string,
  message: string,
) => {
  await axiosInstance.post(`/rooms/${roomId}/chat`, {
    name,
    message,
  });
};
