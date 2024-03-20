import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  resetErrorBoundary: () => void;
};

function FallbackUI({ resetErrorBoundary }: Props) {
  return (
    <div>
      <p className="text-slate-200">
        오류가 발생하였습니다. 재시도 후에도 계속된다면 고객센터에 문의해주세요.
      </p>
      <button
        onClick={resetErrorBoundary}
        type="button"
        className="rounded-md bg-slate-500 p-2 text-slate-200"
      >
        다시 시도
      </button>
    </div>
  );
}

export default function ClientErrorBoundary({
  children,
}: PropsWithChildren<unknown>) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onError={(error: any) => {
        if (isAxiosError(error) || error?.response?.status >= 500) {
          throw error;
        }
      }}
      onReset={reset}
      fallbackRender={FallbackUI}
    >
      {children}
    </ErrorBoundary>
  );
}
