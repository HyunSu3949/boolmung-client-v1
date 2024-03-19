import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

type Props<T extends FieldValues> = {
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: (formdata: T) => void;
  children: React.ReactNode;
};

export default function Form<T extends FieldValues>({
  handleSubmit,
  onSubmit,
  children,
}: Props<T>) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full min-w-[32rem] max-w-4xl rounded-lg p-4 "
    >
      {children}
    </form>
  );
}
