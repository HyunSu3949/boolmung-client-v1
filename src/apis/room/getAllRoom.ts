import axiosInstance from "../utils/instance";

export const getAllRoom = async () => {
  const result = await axiosInstance.get("/rooms", { withCredentials: true });

  return result;
};
