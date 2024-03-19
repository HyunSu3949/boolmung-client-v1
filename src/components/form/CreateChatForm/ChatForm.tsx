import { useForm } from "react-hook-form";

import ErrorMessage from "src/components/form/CreateChatForm/ErrorMessage";
import Form from "src/components/form/CreateChatForm/Form";
import InputField from "src/components/form/CreateChatForm/InputField";
import useCreateChatMutation from "src/hooks/react-query/useCreateChatMutation";
import { CreateChatFormData } from "src/types/formTypes";
import { SpinnerWithComponent } from "src/components/common/SpinnerWithComponent";

export function ChatForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateChatFormData>();

  const { createChatMutate, isPending } = useCreateChatMutation({ setError });

  const onSubmit = (data: CreateChatFormData) => {
    createChatMutate(data);
  };

  return (
    <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <InputField
        label="방 제목"
        type="text"
        registerObject={{
          ...register("title", { required: "방 제목을 입력해 주세요" }),
        }}
        name="title"
      />
      <ErrorMessage errorMessage={errors.title?.message as string} />
      <InputField
        label="참가인원"
        type="number"
        name="max"
        registerObject={{
          ...register("max", {
            required: "참가 인원을 입력해주세요",
            pattern: {
              value: /^[0-9]*$/,
              message: "숫자만 입력해주세요",
            },
          }),
        }}
      />
      <ErrorMessage errorMessage={errors.max?.message as string} />
      <SpinnerWithComponent loading={isPending}>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline m-auto rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            만들기
          </button>
        </div>
      </SpinnerWithComponent>
      <ErrorMessage errorMessage={errors.root?.message as string} />
    </Form>
  );
}
