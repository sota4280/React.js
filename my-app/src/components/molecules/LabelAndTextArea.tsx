import React from "react";
import { ErrorMessage, Textarea } from "../atoms";

type Props = {
  labelTitle: string;
  errorMessage?: string;
} & TextareaProps;

type TextareaProps = React.ComponentProps<typeof Textarea>;

export const LabelAndTextArea: React.FC<Props> = ({
  labelTitle,
  errorMessage,
  ...props
}) => {
  return (
    <>
      <label>
        {labelTitle}
        <div>
          <Textarea {...props} />
        </div>
      </label>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
};
