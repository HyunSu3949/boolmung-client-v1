import axiosInstance from "../utils/instance";

type FormData = {
  title: string;
  max: number;
  owner: string;
};

export const createRoom = async (data: FormData) => {
  const result = await axiosInstance.post("/rooms", data);

  return result;
};
