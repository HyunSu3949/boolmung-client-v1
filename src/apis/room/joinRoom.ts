import axiosInstance from "../instance";

export const joinRoom = async (roomId: string) => {
  const result = await axiosInstance.get(`/rooms/${roomId}`);
  return result;
};
