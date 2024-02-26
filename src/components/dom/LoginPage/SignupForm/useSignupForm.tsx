import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { signup } from "src/apis/postApis";
import { SignUpFormData } from "src/types/index";

type PropsType = {
  closeModal: () => void;
  openConfirmModal: () => void;
};

export const useSignupForm = ({ closeModal, openConfirmModal }: PropsType) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>();

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
        closeModal();
        openConfirmModal();
      }
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    mutate(data);
  };

  const password = watch("password", "");

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    password,
    isPending,
  };
};
