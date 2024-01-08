import axiosInstance from "../utils/instance";

type FormData = {
  email: string;
  password: string;
};

export const login = async (data: FormData) => {
  const result = await axiosInstance.post("/users/login", data);

  return result;
};
