import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { ClipLoader } from "react-spinners";

import { RootState } from "src/redux/store";

const override = {
  display: "flex",
  margin: "0 auto",
  width: "6rem",
  height: "6rem",
};

type Props = {
  size: "lg" | "sm";
};

export function ProfileCard({ size }: Props) {
  const { user } = useSelector((state: RootState) => state.reducer.authReducer);

  const [imageLoaded, setImageLoaded] = useState(false);

  const imageSizeClass = size === "lg" ? "h-24 w-24" : "h-12 w-12";

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = "/img/defaultFace.png";
  };

  useEffect(() => {
    setImageLoaded(false);
  }, [user]);

  return (
    <ErrorBoundary fallback={<div>wrong</div>}>
      <div className="flex flex-col items-center justify-center w-full">
        {!imageLoaded && (
          <ClipLoader
            color="#5690bd"
            loading={!imageLoaded}
            cssOverride={override}
            size={150}
          />
        )}
        <img
          src={user.image}
          onLoad={() => setImageLoaded(true)}
          onError={handleError}
          alt="유저 프로필 이미지"
          className={`${imageSizeClass} rounded-full object-cover`}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
        <div className="space-x-2 text-slate-200">
          <span className="text-lg font-bold">{user.name}</span>님
        </div>
      </div>
    </ErrorBoundary>
  );
}
