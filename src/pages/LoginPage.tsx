import SignupButton from "src/components/LoginPage/SignupButton";

import { LoginForm } from "../components/form/LoginForm/LoginForm";
import Alert from "../components/LoginPage/Alert";

export default function LoginPage() {
  return (
    <div className="m-auto flex w-full items-center justify-center">
      <div className="m-auto flex w-fit flex-col items-center justify-center">
        <LoginForm />
        <SignupButton />
        <Alert />
      </div>
    </div>
  );
}
