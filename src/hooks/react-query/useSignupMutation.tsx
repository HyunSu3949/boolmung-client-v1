import { useMutation } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { useDispatch } from "react-redux";

import { closeModal, openModal } from "src/redux/features/modalSlice";
import { SignupFormData } from "src/types/formTypes";
import { signup } from "src/utils/apis/postApis";

type Props = {
  setError: UseFormSetError<SignupFormData>;
};

export default function useSignupMutation({ setError }: Props) {
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: (body: any) => signup({ body }),
    onError: (error: any) => {
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
    },
    onSuccess: (result) => {
      if (result.status === "success") {
        dispatch(closeModal("signupModal"));
        dispatch(
          openModal({
            componentId: "confirmModal",
            props: { message: "회원가입이 완료되었습니다!" },
          }),
        );
      }
    },
  });
  return { signupMutate: mutate, isPending };
}
