import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { signup } from "src/utils/apis/postApis";
import { SignUpFormData } from "src/types/index";
import { openModal } from "src/redux/features/modalSlice";
import ConfirmModal from "src/components/modal/ConfirmModal";

type PropsType = {
  closeModal: () => void;
};

export const useSignupForm = ({ closeModal }: PropsType) => {
  const dispatch = useDispatch();
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
        dispatch(
          openModal({
            Component: ConfirmModal,
            props: { message: "회원가입이 완료되었습니다!" },
          }),
        );
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
