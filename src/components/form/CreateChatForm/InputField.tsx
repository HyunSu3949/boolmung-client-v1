import { Path, UseFormRegisterReturn } from "react-hook-form";

import { CreateChatFormData } from "src/types/formTypes";

type Props<T extends CreateChatFormData> = {
  label: string;
  type: string;
  registerObject: UseFormRegisterReturn;
  name: Path<T>;
};

export default function InputField<T extends CreateChatFormData>({
  label,
  type,
  name,
  registerObject,
}: Props<T>) {
  return (
    <div className="my-4 flex flex-col">
      <label htmlFor={name} className="mb-2 block font-bold text-slate-200">
        {label}
      </label>
      <input
        id={name}
        type={type}
        className="focus:shadow-outline w-full appearance-none rounded border px-3 leading-tight text-gray-700 placeholder-slate-400 shadow focus:outline-none"
        {...registerObject}
      />
    </div>
  );
}
