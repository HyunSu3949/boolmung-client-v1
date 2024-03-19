export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
};

export type CreateChatFormData = {
  title: string;
  max: number;
};
