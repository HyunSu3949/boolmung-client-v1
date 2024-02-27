import { ClipLoader } from "react-spinners";

const override = {
  display: "flex",
  margin: "0 auto",
  width: "30px",
  height: "30px",
};

export function SpinnerWithText({
  loading,
  children,
}: {
  loading: boolean;
  children?: any;
}) {
  return (
    <div>
      <ClipLoader
        color="#5690bd"
        loading={loading}
        cssOverride={override}
        size={150}
      />
      {!loading && children}
    </div>
  );
}
