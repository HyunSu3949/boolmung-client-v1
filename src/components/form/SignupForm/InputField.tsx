import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  type: string;
  registerObject: UseFormRegisterReturn;
  name: string;
};

export default function InputField({
  label,
  type,
  registerObject,
  name,
}: Props) {
  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={name} className="mb-2 block font-bold text-slate-200">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={`${label}을(를) 입력해주세요`}
        className="focus:shadow-outline w-full appearance-none rounded border px-3 leading-tight text-gray-700 placeholder-slate-400 shadow focus:outline-none"
        {...registerObject}
      />
    </div>
  );
}
