import { type SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUser } from "../api/editApi";
import type { AppDispatch, RootState } from "../app/store";
import { Button, ErrorMessage, ImagePicker } from "../components/atoms";
import { LabelAndTextInput } from "../components/molecules";
import { Header } from "../components/organisms/Header";
import { login } from "../features/authSlice";
import {
  resetEditForm,
  setEditImage,
  updateEditText,
} from "../features/editSlice";
import type { EditTextField } from "../types/type";
import { paths } from "../utils/paths";
import { saveAccessToken } from "../utils/auth";
import {
  isEditButtonDisabled,
  registerImageValidation,
  editValidation,
} from "../utils/validation";
import "../styles/edit.css";

export const Edit: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const form = useSelector((state: RootState) => state.edit);
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 入力値をReduxStoreへ反映する
  const handleChange = (key: EditTextField, value: string) => {
    dispatch(updateEditText({ key, value }));
  };

  // 選択された画像ファイルをRedux Storeへ保存する
  const handleImageChange = (file: File | null) => {
    dispatch(setEditImage(file));
  };

  // 会員登録のバリデーションを使用
  const errors = {
    email: form.email ? editValidation("email", form.email) : "",
    name: form.name ? editValidation("name", form.name) : "",
    image: form.image ? registerImageValidation(form.image) : "",
  };

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    // ブラウザー標準のフォーム送信による再読み込みを止める
    event.preventDefault();

    // 未入力やバリデーションエラーがある場合はAPIを実行しない
    if (isEditButtonDisabled(form) || !form.image) return;

    setSubmitting(true);
    setApiError("");
    try {
      // API成功後にtokenを保存し、ログイン状態を更新してマイページへ移動する
      const token = await editUser(form);
      // トークン保存
      saveAccessToken(token);

      dispatch(login());
      dispatch(resetEditForm());
      navigate(paths.mypage);
    } catch (error) {
      // APIから返されたエラーをフォーム上に表示する
      setApiError(
        error instanceof Error ? error.message : "会員登録変更に失敗しました",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // 入力エラーがある場合と送信中は登録ボタンを無効にする
  const disabled = isEditButtonDisabled(form) || submitting;

  return (
    <div className="edit-page">
      <Header />
      <main className="edit-main">
        <h1>会員情報変更</h1>
        <form className="edit-form" onSubmit={handleSubmit} noValidate>
          {/* ニックネーム */}
          <div className="edit-field">
            <LabelAndTextInput
              labelTitle="ニックネーム（8文字以上）"
              value={form.name}
              onChange={(value) => handleChange("name", value)}
              errorMessage={errors.name}
            />
          </div>
          {/* ログインID */}
          <div className="edit-field">
            <LabelAndTextInput
              labelTitle="ログインID（メールアドレス）"
              value={form.email}
              onChange={(value) => handleChange("email", value)}
              errorMessage={errors.email}
            />
          </div>

          {/* ユーザーアイコン画像 */}
          <div className="edit-field flex flex-col items-center">
            <label className="self-start">ユーザーアイコン画像</label>
            <ImagePicker
              file={form.image}
              hasError={Boolean(errors.image)}
              onChange={handleImageChange}
            />
            {errors.image && <ErrorMessage>{errors.image}</ErrorMessage>}
          </div>

          {apiError && (
            <div className="api-error" role="alert">
              <ErrorMessage>{apiError}</ErrorMessage>
            </div>
          )}

          <div className="edit-submit">
            <Button
              name={submitting ? "変更中..." : "変更する"}
              type="submit"
              isDisabled={disabled}
            />
          </div>
        </form>
      </main>
    </div>
  );
};
