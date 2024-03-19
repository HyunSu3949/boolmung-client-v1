import { ErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";

import { RootState } from "src/redux/store";

type Props = {
  size: "lg" | "sm";
};

export default function MyImage({ size }: Props) {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);
  const imageSizeClass = size === "lg" ? "h-24 w-24" : "h-6 w-6";

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = "/img/defaultFace.png";
  };
  return (
    <ErrorBoundary
      fallback={
        <img
          src="/img/defaultFace.png"
          alt="기본 이미지"
          className={`${imageSizeClass} rounded-full object-cover`}
        />
      }
    >
      <img
        src={user.image}
        onError={handleError}
        alt="유저 프로필 이미지"
        className={`${imageSizeClass} rounded-full object-cover`}
      />
    </ErrorBoundary>
  );
}
