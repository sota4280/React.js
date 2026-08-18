import React from "react";

type Props = {
  id: string;
  onChange: (file: File | null) => void;
  inputRef?: React.Ref<HTMLInputElement>;
};

export const ImgInput = ({ id, onChange, inputRef }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    onChange(file);
  };
  return (
    <input
      ref={inputRef}
      id={id}
      type="file"
      accept="image/jpeg,image/jpg"
      className="hidden"
      onChange={handleChange}
    />
  );
};
