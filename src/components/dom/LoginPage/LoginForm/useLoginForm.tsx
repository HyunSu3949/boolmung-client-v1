import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { login } from "src/apis/postApis";
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

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: (body: any) => login({ body }),
    onError: (error: any) => {
      if (error.response.status === 401) {
        setError("root", {
          type: "manual",
          message: "아이디 또는 비밀번호를 확인해주세요.",
        });
      } else {
        setError("root", {
          type: "manual",
          message: "잠시 후 다시 시도해주세요.",
        });
      }
    },
    onSuccess: (result) => {
      if (result.status === "success") {
        const { token, data } = result;

        dispatch(setLoginState({ token, user: data.user }));
      }
    },
  });

  const onSubmit = async (data: FormData) => {
    loginMutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending,
  };
};
