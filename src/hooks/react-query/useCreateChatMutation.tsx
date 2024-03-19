import { useMutation } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { closeModal } from "src/redux/features/modalSlice";
import { RootState } from "src/redux/store";
import { CreateChatFormData } from "src/types/formTypes";
import { createRoom } from "src/utils/apis/postApis";

type Props = {
  setError: UseFormSetError<CreateChatFormData>;
};

export default function useCreateChatMutation({ setError }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);

  const { mutate: createChatMutate, isPending } = useMutation({
    mutationFn: (data: CreateChatFormData) =>
      createRoom({ body: { ...data, owner: user._id } }),
    onError: (error: unknown) => {
      setError("root", {
        type: "manual",
        message: "잠시 후 다시 시도해주세요.",
      });
    },
    onSuccess: (result) => {
      dispatch(closeModal("createChatModal"));
      const roomId = result.data._id;
      navigate(`room/${roomId}`);
    },
  });

  return { createChatMutate, isPending };
}
