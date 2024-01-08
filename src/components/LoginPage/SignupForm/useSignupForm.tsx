import { useForm } from "react-hook-form";
import { signup } from "../../../apis/user/signup";

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type PropsType = {
  closeModal: () => void;
};

export const useSignupForm = ({ closeModal }: PropsType) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await signup(data);
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      if (
        errorMessage.includes("Duplicate") &&
        errorMessage.includes("email")
      ) {
        setError("email", {
          type: "manual",
          message: "이미 사용중인 이메일 입니다.",
        });
      } else if (
        errorMessage.includes("Invalid input data") &&
        errorMessage.includes(`password`)
      ) {
        setError("password", {
          type: "manual",
          message: "8자리 이상 입력해주세요",
        });
      }

      return;
    }
    closeModal();
    alert("회원가입 완료!");
  };

  const password = watch("password", "");

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    password,
  };
};
