import { ClipLoader } from "react-spinners";

const override = {
  display: "flex",
  margin: "0 auto",
  width: "30px",
  height: "30px",
};

export function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <ClipLoader color="#5690bd" loading cssOverride={override} size={150} />
    </div>
  );
}
