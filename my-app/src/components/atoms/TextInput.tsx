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
      className="border border-gray rounded-sm w-full h-8 "
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};
