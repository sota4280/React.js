import React from "react";

type Props = {
  children: React.ReactNode;
}

export const ErrorMessage: React.FC<Props> = ({ children }) => {
  return <p className="text-sm text-red-400 mt-1">{children}</p>;
};
