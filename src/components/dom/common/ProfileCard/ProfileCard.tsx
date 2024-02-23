import { ErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";

import { RootState } from "src/redux/store";

type Props = {
  size: "lg" | "sm";
};

export function ProfileCard({ size }: Props) {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);

  const imageSizeClass = size === "lg" ? "h-24 w-24" : "h-12 w-12";
  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = "/img/defaultFace.png";
  };

  return (
    <ErrorBoundary fallback={<div>wrong</div>}>
      <div className="flex w-full flex-col items-center justify-center ">
        <img
          src={user.image}
          onError={handleError}
          alt="유저 프로필 이미지"
          className={`${imageSizeClass} rounded-full object-cover`}
        />
        <div className="space-x-2 text-slate-200">
          <span className="text-lg font-bold ">{user.name}</span>님
        </div>
      </div>
    </ErrorBoundary>
  );
}
