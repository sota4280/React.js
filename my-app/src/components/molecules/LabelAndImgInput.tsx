import React from "react";
import { ErrorMessage } from "../atoms";
import { ImgInput } from "../atoms/ImgInput";

type Props = {
  errorMessage?: string;
  imgSrc?: string;
} & ImgInputProps;

type ImgInputProps = React.ComponentProps<typeof ImgInput>;

export const LabelAndImgInput: React.FC<Props> = ({
  id,
  imgSrc,
  errorMessage,
  onChange,
}) => {
  return (
    <>
      <div>
        <label htmlFor={id}>ユーザーアイコン画像</label>
      </div>

      <div className="w-2/3 mx-auto text-center">
        <div className="avatar mt-4 flex justify-center">
          <div className="w-24 rounded-full ">
            {/* 画像表示 */}
            <label htmlFor={id} className="cursor-pointer">
              <img
                src={imgSrc || "/logo.png"}
                alt="ユーザーアイコン"
                className="w-24 h-24 rounded-full object-cover"
              />
            </label>
          </div>
        </div>

        <ImgInput 
         id={id} 
         onChange={onChange} 
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <div className="text-center mt-4 pb-4">タップして画像を変更</div>
      </div>
    </>
  );
};
