import { UseFormHandleSubmit } from "react-hook-form";

import { LoginFormData } from "src/types/formTypes";

type Props = {
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  onSubmit: (formdata: LoginFormData) => void;
  children: React.ReactNode;
};

export default function Form({ handleSubmit, onSubmit, children }: Props) {
  return (
    <form
      className="w-80 items-center space-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {children}
    </form>
  );
}
