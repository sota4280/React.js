import React, { ReactHTMLElement } from "react";

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  type?: "text" | "password"; 
};
export const TextInput: React.FC<Props> = ({
  value,
  placeholder,
  onChange,
  type,
}) => {
  return (
    <input
      className="border border-gray rounded-sm w-full h-12 px-3 text-base"
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};
