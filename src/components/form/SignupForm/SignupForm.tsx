import { useForm } from "react-hook-form";

import { SpinnerWithComponent } from "src/components/common/SpinnerWithComponent";
import { SignUpFormData } from "src/types/index";
import useSignupMutation from "src/hooks/react-query/useSignupMutation";
import Form from "src/components/form/SignupForm/Form";
import InputField from "src/components/form/SignupForm/InputField";
import ErrorMessage from "src/components/form/SignupForm/ErrorMessage";
import Buttons from "src/components/form/SignupForm/Buttons";

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<SignUpFormData>();
  const { signupMutate, isPending } = useSignupMutation({ setError });

  const onSubmit = (data: SignUpFormData) => {
    signupMutate(data);
  };

  return (
    <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <InputField
        label="닉네임"
        type="text"
        name="name"
        registerObject={{
          ...register("name", {
            required: "이름을 입력해주세요",
            validate: (value: string) =>
              value.length > 1 || "2자 이상 입력해주세요",
          }),
        }}
      />
      <ErrorMessage errorMessage={errors.name?.message as string} />
      <InputField
        label="이메일"
        type="email"
        name="email"
        registerObject={{
          ...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,
              message: "이메일 형식으로 입력해주세요",
            },
          }),
        }}
      />
      <ErrorMessage errorMessage={errors.password?.message as string} />
      <InputField
        label="비밀번호"
        type="password"
        name="password"
        registerObject={{
          ...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 8,
              message: "8자리 이상 입력해주세요",
            },
          }),
        }}
      />
      <ErrorMessage errorMessage={errors.password?.message as string} />
      <InputField
        label="비밀번호"
        type="password"
        name="passwordConfirm"
        registerObject={{
          ...register("passwordConfirm", {
            required: "비밀번호 확인을 입력해주세요",
            validate: (value: string) =>
              value === watch("password") || "비밀번호가 일치하지 않습니다",
          }),
        }}
      />
      <ErrorMessage errorMessage={errors.passwordConfirm?.message as string} />
      <SpinnerWithComponent loading={isPending}>
        <Buttons />
      </SpinnerWithComponent>
    </Form>
  );
}
