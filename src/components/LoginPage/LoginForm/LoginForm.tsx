import React from "react";
import { useLoginForm } from "./useLoginForm";
import "./LoginForm.css";

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors, onSubmit } = useLoginForm();

  return (
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "이메일을 입력해주세요",
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
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      {errors.root && <p>{errors.root.message}</p>}
      <button type="submit">로그인</button>
    </form>
  );
};
