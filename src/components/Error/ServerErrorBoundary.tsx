import { PropsWithChildren } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  resetErrorBoundary: () => void;
};

function FallbackUI({ resetErrorBoundary }: Props) {
  return (
    <div>
      <h2> 데이터를 불러오는데 실패하였습니다. </h2>
      <p> 잠시 후 다시 시도해주세요. </p>
      <button onClick={resetErrorBoundary} type="button">
        다시 시도
      </button>
    </div>
  );
}

export default function ServerErrorBoundary({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={FallbackUI}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
