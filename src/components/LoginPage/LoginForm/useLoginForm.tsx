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
      console.log(result.data);
      if (result.data.status === "success") {
        setIsLogedIn(true);
        localStorage.setItem("token", result.data.token); // 로그인 성공 시 토큰을 로컬 스토리지에 저장
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
