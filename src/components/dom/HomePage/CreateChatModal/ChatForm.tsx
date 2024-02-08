import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createRoom } from "src/apis/room/createRoom";
import { RootState } from "src/redux/store";

type FormData = {
  title: string;
  max: number;
};
type PropsType = {
  closeModal: () => void;
};

export function ChatForm({ closeModal }: PropsType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.reducer.authReducer);

  const onSubmit = async (data: FormData) => {
    let roomId;
    try {
      const result = await createRoom({ ...data, owner: user._id });
      console.log(result);
      roomId = result.data.data.data._id;
    } catch (error: any) {
      return;
    }
    closeModal();

    navigate(`room/${roomId}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">방 제목</label>
        <input
          id="title"
          placeholder="방 제목을 입력해주세요"
          type="text"
          {...register("title", { required: "방 제목을 입력해 주세요" })}
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="max">참가인원</label>
        <input
          id="max"
          type="number"
          placeholder="2"
          min={2}
          max={10}
          {...register("max", {
            required: "참가 인원을 입력해주세요",
            pattern: {
              value: /^[0-9]*$/,
              message: "숫자만 입력해주세요",
            },
          })}
        />
        {errors.max && <p>{errors.max.message}</p>}
      </div>
      <div>
        <button type="submit">개설하기</button>
        <button type="button" onClick={closeModal}>
          취소
        </button>
      </div>
    </form>
  );
}
