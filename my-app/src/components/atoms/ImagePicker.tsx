import { useEffect, useMemo, useRef } from "react";
import { UserRound } from "lucide-react";
import { ImgInput } from "./ImgInput";

type Props = {
  file: File | null;
  hasError?: boolean;
  onChange: (file: File | null) => void;
};

export const ImagePicker = ({ file, hasError = false, onChange }: Props) => {
  // 見た目のボタンから非表示のfile inputを開くための参照
  const inputRef = useRef<HTMLInputElement>(null);

  // 正しい画像が選択された場合だけプレビューURLを生成する
  const preview = useMemo(
    () => (file && !hasError ? URL.createObjectURL(file) : ""),
    [file, hasError],
  );

  // 生成したURLを破棄してメモリリークを防ぐ
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  return (
    <>
      <ImgInput id="register-image" inputRef={inputRef} onChange={onChange} />
      <button
        className="image-picker flex flex-col items-center gap-2 bg-transparent text-sm"
        type="button"
        onClick={() => inputRef.current?.click()}
      >
        <span className="grid size-22 place-items-center overflow-hidden rounded-full bg-slate-200">
          {preview ? (
            <img
              className="size-full object-cover"
              src={preview}
              alt="選択したユーザーアイコン"
            />
          ) : (
            <UserRound aria-hidden="true" />
          )}
        </span>
        <span>タップして画像を変更</span>
      </button>
    </>
  );
};
