import { SpinnerWithText } from "src/components/common/SpinnerWithText";
import { useLoginForm } from "./useLoginForm";

export function LoginForm() {
  const { register, handleSubmit, errors, onSubmit, isPending } =
    useLoginForm();

  return (
    <form
      className="items-center space-y-2 w-80"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <label htmlFor="email" className="w-20 text-white">
          이메일
        </label>
        <input
          id="email"
          type="email"
          className="px-4 py-2 rounded-md focus:border-blue-500 focus:ring-blue-500"
          {...register("email", {
            required: "이메일을 입력해주세요",
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="w-20 text-white">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          className="px-4 py-2 rounded-md focus:border-blue-500 focus:ring-blue-500"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
          })}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}
      <button
        type="submit"
        className="w-full py-2 text-white rounded-md bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
      >
        <SpinnerWithText loading={isPending}>
          <span>로그인</span>
        </SpinnerWithText>
      </button>
    </form>
  );
}
