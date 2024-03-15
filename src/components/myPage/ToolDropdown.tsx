import { useState } from "react";

import { Svgs } from "src/components/common/Svgs";

type Props = {
  selectedValue: string;
  onChange: (value: string) => void;
};
export default function ToolDropdown({ selectedValue, onChange }: Props) {
  const options = [
    { value: "pen", label: "펜" },
    { value: "eraser", label: "지우개" },
  ];

  return (
    <>
      <select
        value={selectedValue}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="w-24 px-1 mb-2 border-gray-300 rounded shadow-sm"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="flex items-center space-x-2"
          >
            {option.label}
          </option>
        ))}
      </select>
      {selectedValue === "pen" ? (
        <Svgs id="edit" size="1.75rem" title="연필 아이콘" />
      ) : (
        <Svgs id="eraser" size="1.75rem" title="지우개 아이콘" />
      )}
    </>
  );
}
