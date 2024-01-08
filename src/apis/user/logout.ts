import axiosInstance from "../utils/instance";

export const logout = async () => {
  const result = await axiosInstance.get("/users/logout");

  return result;
};
