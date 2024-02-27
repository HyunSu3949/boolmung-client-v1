import { SpinnerWithText } from "src/components/dom/common/SpinnerWithText";
import { useSignupForm } from "./useSignupForm";

type propsType = {
  closeModal: () => void;
  openConfirmModal: () => void;
};

export function SignupForm({ closeModal, openConfirmModal }: propsType) {
  const { register, handleSubmit, errors, onSubmit, password, isPending } =
    useSignupForm({
      closeModal,
      openConfirmModal,
    });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full min-w-[32rem] max-w-4xl rounded-lg p-4 "
    >
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-bold text-slate-200">
          닉네임
        </label>
        <input
          id="name"
          type="text"
          placeholder="이름을 입력해주세요"
          className="w-full px-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline placeholder-slate-400 focus:outline-none"
          {...register("name", {
            required: "이름을 입력해주세요",
            validate: (value: string) =>
              value.length > 1 || "2자 이상 입력해주세요",
          })}
        />
        {errors.name && (
          <p className="font-bold text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-bold text-slate-200">
          이메일
        </label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          className="w-full px-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline placeholder-slate-400 focus:outline-none"
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,
              message: "이메일 형식으로 입력해주세요",
            },
          })}
        />
        {errors.email && (
          <p className="font-bold text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block mb-2 font-bold text-slate-200"
        >
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="w-full px-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline placeholder-slate-400 focus:outline-none"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 8,
              message: "8자리 이상 입력해주세요",
            },
          })}
        />
        {errors.password && (
          <p className="font-bold text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="passwordConfirm"
          className="block mb-2 font-bold text-slate-200"
        >
          비밀번호 확인
        </label>
        <input
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호를 확인해주세요"
          className="w-full px-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline placeholder-slate-400 focus:outline-none"
          {...register("passwordConfirm", {
            required: "비밀번호 확인을 입력해주세요",
            validate: (value: string) =>
              value === password || "비밀번호가 일치하지 않습니다",
          })}
        />
        {errors.passwordConfirm && (
          <p className="font-bold text-red-500">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>
      <div className="flex justify-center">
        <SpinnerWithText loading={isPending}>
          <div className="space-x-2">
            <button
              type="submit"
              className="p-4 bg-blue-600 rounded-md text-slate-200 hover:bg-blue-400"
            >
              회원가입
            </button>
            <button
              type="button"
              className="p-4 rounded-md bg-slate-500 text-slate-200 hover:bg-slate-300"
              onClick={closeModal}
            >
              취소
            </button>
          </div>
        </SpinnerWithText>
      </div>
    </form>
  );
}
