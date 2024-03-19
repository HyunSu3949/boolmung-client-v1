import { useMutation } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setLoginState } from "src/redux/features/authSlice";
import { LoginFormData } from "src/types/formTypes";
import { login } from "src/utils/apis/postApis";

type Props = {
  setError: UseFormSetError<LoginFormData>;
};

export default function useLoginMutation({ setError }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: (body: any) => login({ body }),
    onError: (error: any) => {
      if (error.response && error.response.status === 401) {
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
        navigate("/");
      }
    },
  });

  return { loginMutate, isPending };
}
