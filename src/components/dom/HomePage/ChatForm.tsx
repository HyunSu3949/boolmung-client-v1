import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createRoom } from "src/utils/apis/postApis";
import { RootState } from "src/redux/store";

type FormData = {
  title: string;
  max: number;
};

export function ChatForm() {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  const { data, mutate, isError, isSuccess } = useMutation<
    any,
    Error,
    FormData
  >({
    mutationFn: (data: FormData) => {
      return createRoom({ body: { ...data, owner: user._id } });
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  if (isSuccess) {
    const roomId = data.data._id;
    navigate(`room/${roomId}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full min-w-[32rem] max-w-4xl rounded-lg p-4 "
    >
      <div className="my-4 mb-4">
        <label htmlFor="title" className="mb-2 block font-bold text-slate-200">
          방 제목
        </label>
        <input
          id="title"
          placeholder="방 제목을 입력해주세요"
          type="text"
          className="focus:shadow-outline w-full appearance-none rounded border px-3 leading-tight text-gray-700 placeholder-slate-400 shadow focus:outline-none"
          {...register("title", { required: "방 제목을 입력해 주세요" })}
        />
        {errors.title && (
          <p className="font-bold text-red-500">{errors.title.message}</p>
        )}
      </div>
      <div className="my-4 mb-6">
        <label htmlFor="max" className="mb-2 block font-bold text-slate-200">
          참가인원
        </label>
        <input
          id="max"
          type="number"
          placeholder="2"
          className="focus:shadow-outline w-full appearance-none rounded border px-3 leading-tight text-gray-700 placeholder-slate-400 shadow focus:outline-none"
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
        {errors.max && (
          <p className="font-bold text-red-500">{errors.max.message}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="focus:shadow-outline m-auto rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          만들기
        </button>
      </div>
    </form>
  );
}
