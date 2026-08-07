import React from "react";

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};
export const TextInput: React.FC<Props> = ({
  value,
  placeholder,
  onChange,
}) => {
  return (
    <input
      className="border border-gray rounded-sm w-full h-8 "
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};
