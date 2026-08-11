import React from "react";

type Props = {
  name: string;
  onClick?: () => void;
  isDisabled?: boolean;
  type: "button" | "submit"; 
};

export const Button: React.FC<Props> = ({ name, onClick, isDisabled = false, type }) => {
  const baseClass = isDisabled
    ? "bg-blue-600 text-white rounded w-full py-1 opacity-50"
    : "bg-blue-600 text-white rounded w-full py-1";

  return (
    <button className={baseClass} onClick={onClick} disabled={isDisabled} type={type}>
      {name}
    </button>
  );
};
