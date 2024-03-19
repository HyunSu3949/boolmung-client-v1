import { useSelector } from "react-redux";

import { RootState } from "src/redux/store";

import MyImage from "./MyImage";

export function ProfileCard() {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <MyImage size="lg" />
      <div className="space-x-2 text-slate-200">
        <span className="text-lg font-bold">{user.name}</span>님
      </div>
    </div>
  );
}
