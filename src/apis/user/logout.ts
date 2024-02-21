import { axiosInstance } from "../instance";

export const logout = async () => {
  const result = await axiosInstance.get("/users/logout");

  return result;
};
