import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { login } from "src/apis/user/login";
import { setLoginState } from "src/redux/features/authSlice";

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
  const dispatch = useDispatch();

  const onSubmit = async (data: FormData) => {
    try {
      const result = await login(data);
      if (result.data.status === "success") {
        const {
          token,
          data: { user },
        } = result.data;

        dispatch(setLoginState({ token, user }));
      }
    } catch (error: any) {
      setError("root", {
        type: "manual",
        message: "잠시 후 다시 시도해주세요.",
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
