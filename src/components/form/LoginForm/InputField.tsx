import { Path, UseFormRegisterReturn } from "react-hook-form";

import { LoginFormData } from "src/types/formTypes";

type Props<T extends LoginFormData> = {
  label: string;
  type: string;
  registerObject: UseFormRegisterReturn;
  name: Path<T>;
};

export default function InputField<T extends LoginFormData>({
  label,
  type,
  name,
  registerObject,
}: Props<T>) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="w-20 text-white">
        {label}
      </label>
      <input
        id={name}
        type={type}
        className="rounded-md px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
        {...registerObject}
      />
    </div>
  );
}
