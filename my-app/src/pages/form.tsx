import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/atoms";
import { LabelAndTextInput } from "../components/molecules";
import { validation, isButtonDisabled } from "../utils/validation";
import type { FormErrors, FormValues, ZipAddress } from "../types/type";
import type { RootState, AppDispatch } from "../app/store";
import {
  resetForm,
  setAddress,
  updateForm,
  initialState,
} from "../features/formSlice";

// formSlice.tsと追加・削除が連動するように修正
const initialError: FormErrors = { ...initialState };

export const Form: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const form = useSelector((state: RootState) => state.form);

  const [error, setError] = useState<FormErrors>(initialError);

  // 入力値変更
  const handleChange = (key: keyof FormValues, value: string) => {
    const nextForm: FormValues = {
      ...form,
      [key]: value,
    };

    // 状態管理（store）更新
    dispatch(
      updateForm({
        key,
        value,
      }),
    );

    const errorMessage = validation(key, value, nextForm);

    // 変更された項目のエラーメッセージを更新
    setError((prev) => ({
      ...prev,
      [key]: errorMessage,

      // パスワード変更時に確認用パスワードも再チェック
      ...(key === "password" && nextForm.confirmPassword !== ""
        ? {
            confirmPassword: validation(
              "confirmPassword",
              nextForm.confirmPassword,
              nextForm,
            ),
          }
        : {}),
    }));
  };

  // 登録処理
  const handleSubmit = (
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    event.preventDefault();

    if (isButtonDisabled(form, error)) {
      return;
    }

    console.table(form);

    dispatch(resetForm());
    setError(initialError);
  };

  // 検索ボタンの非活性判定
  const isSearchDisabled = form.zip === "" || error.zip !== "";

  // 住所検索
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${form.zip}`,
      );

      if (!response.ok) {
        throw new Error("住所検索に失敗しました");
      }

      const result: ZipAddress = await response.json();

      const firstAddress = result.results?.[0];

      if (!firstAddress) {
        setError((prev) => ({
          ...prev,
          zip: "存在しない郵便番号です",
        }));

        return;
      }

      // 住所をslice処理から表示
      dispatch(
        setAddress({
          prefecture: firstAddress.address1,
          municipalities: `${firstAddress.address2}${firstAddress.address3}`,
        }),
      );

      setError((prev) => ({
        ...prev,
        zip: "",
        prefecture: "",
        municipalities: "",
        address: "",
      }));
    } catch (searchError) {
      console.error(searchError);

      setError((prev) => ({
        ...prev,
        zip: "住所検索に失敗しました",
      }));
    }
  };

  return (
    <div className="max-w-sm mx-auto w-full py-10">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <LabelAndTextInput
          labelTitle="名前"
          value={form.name}
          placeholder="お名前"
          onChange={(value) => handleChange("name", value)}
          errorMessage={error.name}
        />

        <LabelAndTextInput
          labelTitle="ユーザーネーム（任意）"
          value={form.username}
          placeholder="ユーザーネーム（任意）"
          onChange={(value) => handleChange("username", value)}
          errorMessage={error.username}
        />

        <LabelAndTextInput
          labelTitle="メールアドレス"
          value={form.email}
          placeholder="sample@example.com"
          onChange={(value) => handleChange("email", value)}
          errorMessage={error.email}
        />

        <LabelAndTextInput
          labelTitle="パスワード"
          value={form.password}
          type="password"
          placeholder="パスワード"
          onChange={(value) => handleChange("password", value)}
          errorMessage={error.password}
        />

        <LabelAndTextInput
          labelTitle="パスワード確認"
          value={form.confirmPassword}
          type="password"
          placeholder="パスワード確認"
          onChange={(value) => handleChange("confirmPassword", value)}
          errorMessage={error.confirmPassword}
        />

        <div className="flex gap-2">
          <div className="w-2/5">
            <LabelAndTextInput
              labelTitle="郵便番号"
              value={form.zip}
              placeholder="0123456"
              onChange={(value) => handleChange("zip", value)}
              errorMessage={error.zip}
            />
          </div>

          <div className="w-20 pt-6">
            <Button
              name="検索"
              onClick={handleSearch}
              type="button"
              isDisabled={isSearchDisabled}
            />
          </div>
        </div>

        <LabelAndTextInput
          labelTitle="都道府県"
          value={form.prefecture}
          placeholder="都道府県"
          onChange={(value) => handleChange("prefecture", value)}
          errorMessage={error.prefecture}
        />

        <LabelAndTextInput
          labelTitle="市区町村"
          value={form.municipalities}
          placeholder="市区町村"
          onChange={(value) => handleChange("municipalities", value)}
          errorMessage={error.municipalities}
        />

        <LabelAndTextInput
          labelTitle="番地"
          value={form.address}
          placeholder="番地"
          onChange={(value) => handleChange("address", value)}
          errorMessage={error.address}
        />

        <div className="pt-5">
          <Button
            name="登録"
            type="submit"
            isDisabled={isButtonDisabled(form, error)}
          />
        </div>
      </form>
    </div>
  );
};
