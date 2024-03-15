import SignupButton from "src/components/LoginPage/SignupButton";

import { LoginForm } from "../components/LoginPage/LoginForm/LoginForm";
import Alert from "../components/LoginPage/Alert";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center w-full m-auto">
      <div className="flex flex-col items-center justify-center m-auto w-fit">
        <LoginForm />
        <SignupButton />
        <Alert />
      </div>
    </div>
  );
}
