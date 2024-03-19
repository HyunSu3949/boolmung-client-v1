import { useForm } from "react-hook-form";

import InputField from "src/components/form/LoginForm/InputField";
import { SpinnerWithComponent } from "src/components/common/SpinnerWithComponent";
import useLoginMutation from "src/hooks/react-query/useLoginMutation";
import { LoginFormData } from "src/types/formTypes";
import Form from "src/components/form/LoginForm/Form";
import Button from "src/components/form/LoginForm/Button";

import ErrorMessage from "./ErrorMessage";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>();
  const { loginMutate, isPending } = useLoginMutation({ setError });

  const onSubmit = (data: LoginFormData) => {
    loginMutate(data);
  };

  return (
    <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <InputField
        label="이메일"
        type="email"
        name="email"
        registerObject={{
          ...register("email", {
            required: `이메일을 입력해주세요`,
          }),
        }}
      />
      <ErrorMessage errorMessage={errors.email?.message as string} />
      <InputField
        label="비밀번호"
        type="password"
        name="password"
        registerObject={{
          ...register("password", {
            required: `비밀번호를 입력해주세요`,
          }),
        }}
      />
      <ErrorMessage errorMessage={errors.password?.message as string} />
      <ErrorMessage errorMessage={errors.root?.message as string} />
      <Button>
        <SpinnerWithComponent loading={isPending}>
          <span>로그인</span>
        </SpinnerWithComponent>
      </Button>
    </Form>
  );
}
