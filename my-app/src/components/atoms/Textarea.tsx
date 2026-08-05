import React from "react";

type Props = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export const Textarea: React.FC<Props> = ({ value, placeholder, onChange }) => {
  return (
    <textarea
      className="border border-gray rounded-sm w-full"
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};
