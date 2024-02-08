import { useSelector } from "react-redux";

import { RootState } from "src/redux/store";

type Props = {
  size: "lg" | "sm";
};

export function ProfileCard({ size }: Props) {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);

  const imageSizeClass = size === "lg" ? "h-24 w-24" : "h-12 w-12";

  return (
    <div className="m-auto w-fit">
      <img
        src={user.image}
        alt="유저 프로필 이미지"
        className={`${imageSizeClass} rounded-full object-cover`}
      />
      <div>{`${user.name} 님`}</div>
    </div>
  );
}
