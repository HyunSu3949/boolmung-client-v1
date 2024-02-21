import axiosInstance from "../instance";

type LoginFormData = {
  email: string;
  password: string;
};

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const getme = async () => {
  const result = await axiosInstance("/users/me");

  return result;
};

export const login = async (data: LoginFormData) => {
  const result = await axiosInstance.post("/users/login", data);

  return result;
};

export const logout = async () => {
  const result = await axiosInstance.get("/users/logout");

  return result;
};

export const signup = async (data: SignupFormData) => {
  const result = await axiosInstance.post("/users/signup", data);

  return result;
};

export const updateProfile = async (data: any) => {
  const result = await axiosInstance.patch("/users/update", data);

  return result;
};
