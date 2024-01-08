import axiosInstance from "../utils/instance";

export const getme = async () => {
  const result = await axiosInstance("/users/me");

  return result;
};
