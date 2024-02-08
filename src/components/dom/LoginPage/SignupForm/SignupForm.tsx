import React from "react";
import { useSignupForm } from "./useSignupForm";

type propsType = {
  closeModal: () => void;
};

export const SignupForm = ({ closeModal }: propsType) => {
  const { register, handleSubmit, errors, onSubmit, password } = useSignupForm({
    closeModal,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">닉네임</label>
        <input
          id="name"
          type="text"
          {...register("name", {
            required: "이름을 입력해주세요",
            validate: (value: string) =>
              value.length > 1 || "2자 이상 입력해주세요",
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 6,
              message: "6자리 이상 입력해주세요",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          id="passwordConfirm"
          type="password"
          {...register("passwordConfirm", {
            required: "비밀번호 확인을 입력해주세요",
            validate: (value: string) =>
              value === password || "비밀번호가 일치하지 않습니다",
          })}
        />
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
      </div>
      <div>
        <button type="submit">회원가입</button>
        <button type="button" onClick={closeModal}>
          취소
        </button>
      </div>
    </form>
  );
};
