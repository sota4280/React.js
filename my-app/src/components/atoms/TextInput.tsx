import React from "react";

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute; 
};
export const TextInput: React.FC<Props> = ({
  value,
  placeholder,
  onChange,
  type="text",
}) => {
  return (
    <input
      className="border border-gray rounded-sm w-full h-8 "
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};
