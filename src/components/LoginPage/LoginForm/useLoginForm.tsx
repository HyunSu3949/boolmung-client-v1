import { useForm } from "react-hook-form";
import { login } from "../../../apis/user/login";
import { useAuth } from "../../common/Context/AuthContext";

type FormData = {
  email: string;
  password: string;
};

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  const { setIsLogedIn } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      const result = await login(data);
      console.log(result);
      if (result.status === 200) {
        setIsLogedIn(true);
      }
    } catch (error: any) {
      setError("root", {
        type: "manual",
        message: "이메일 또는 비밀번호가 일치하지 않습니다",
      });
      return;
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
