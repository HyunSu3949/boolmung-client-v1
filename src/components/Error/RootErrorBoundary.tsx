import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

function FallbackUI() {
  return (
    <div>
      <p>알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
    </div>
  );
}

export default function RootErrorBoundary({
  children,
}: PropsWithChildren<unknown>) {
  return <ErrorBoundary fallbackRender={FallbackUI}>{children}</ErrorBoundary>;
}
