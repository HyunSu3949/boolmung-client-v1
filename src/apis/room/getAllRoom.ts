import { axiosInstance } from "../instance";

export const getAllRoom = async () => {
  const result = await axiosInstance.get("/rooms", { withCredentials: true });

  return result;
};
