import axiosInstance from "../utils/instance";

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const signup = async (data: FormData) => {
  const result = await axiosInstance.post("/users/signup", data);

  return result;
};
