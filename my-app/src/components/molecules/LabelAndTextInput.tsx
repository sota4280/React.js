import React from "react";
import { TextInput} from "../atoms/TextInput";
import { ErrorMessage } from "../atoms";
type Props = {
  labelTitle: string;
  errorMessage?: string;
} & TextInputProps;

type TextInputProps = React.ComponentProps<typeof TextInput>;

export const LabelAndTextInput: React.FC<Props> = ({
  labelTitle,
  errorMessage,
  ...props
}) => {
  return (
    <>
      <label>
        {labelTitle}
        <div>
          <TextInput {...props} />
        </div>
      </label>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
};
