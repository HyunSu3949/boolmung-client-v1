import { UseFormHandleSubmit } from "react-hook-form";

import { CreateChatFormData } from "src/types/formTypes";

type Props = {
  handleSubmit: UseFormHandleSubmit<CreateChatFormData>;
  onSubmit: (formdata: CreateChatFormData) => void;
  children: React.ReactNode;
};

export default function Form({ handleSubmit, onSubmit, children }: Props) {
  return (
    <form
      className="mx-auto w-full min-w-[32rem] max-w-4xl rounded-lg p-4 "
      onSubmit={handleSubmit(onSubmit)}
    >
      {children}
    </form>
  );
}
