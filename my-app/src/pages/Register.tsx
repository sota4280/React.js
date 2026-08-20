import { type SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/registerApi";
import type { AppDispatch, RootState } from "../app/store";
import { Button, ErrorMessage, ImagePicker } from "../components/atoms";
import { LabelAndTextInput } from "../components/molecules";
import { Header } from "../components/organisms/Header";
import { login } from "../features/authSlice";
import {
  resetRegisterForm,
  setRegisterImage,
  updateRegisterText,
} from "../features/registerSlice";
import type { RegisterTextField } from "../types/type";
import { paths } from "../utils/paths";
import { saveAccessToken } from "../utils/auth";
import {
  isRegisterButtonDisabled,
  registerImageValidation,
  registerValidation,
} from "../utils/validation";
import "../styles/register.css";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const form = useSelector((state: RootState) => state.register);
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 入力値をReduxStoreへ反映する
  const handleChange = (key: RegisterTextField, value: string) => {
    dispatch(updateRegisterText({ key, value }));
  };

  // 選択された画像ファイルをRedux Storeへ保存する
  const handleImageChange = (file: File | null) => {
    dispatch(setRegisterImage(file));
  };

  // Reduxに保持した現在の入力値から各エラーを算出する
  const errors = {
    email: form.email ? registerValidation("email", form.email, form) : "",
    password: form.password
      ? registerValidation("password", form.password, form)
      : "",
    passwordConfirmation: form.passwordConfirmation
      ? registerValidation(
          "passwordConfirmation",
          form.passwordConfirmation,
          form,
        )
      : "",
    name: form.name ? registerValidation("name", form.name, form) : "",
    image: form.image ? registerImageValidation(form.image) : "",
  };

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    // ブラウザー標準のフォーム送信による再読み込みを止める
    event.preventDefault();

    // 未入力やバリデーションエラーがある場合はAPIを実行しない
    if (isRegisterButtonDisabled(form) || !form.image) return;

    // 前回のAPIエラーを消してから登録を開始する
    setSubmitting(true);
    setApiError("");
    try {
      // API成功後にtokenを保存し、ログイン状態を更新してマイページへ移動する
      const token = await registerUser(form);
      // トークン保存
      saveAccessToken(token);

      dispatch(login());
      dispatch(resetRegisterForm());
      navigate(paths.mypage);
    } catch (error) {
      // APIから返されたエラーをフォーム上に表示する
      setApiError(
        error instanceof Error ? error.message : "会員登録に失敗しました",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // 入力エラーがある場合と送信中は登録ボタンを無効にする
  const disabled = isRegisterButtonDisabled(form) || submitting;

  return (
    <div className="register-page">
      <Header />
      <main className="register-main">
        <h1>会員登録</h1>
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {/* ログインID */}
          <div className="register-field">
            <LabelAndTextInput
              labelTitle="ログインID（メールアドレス）"
              value={form.email}
              onChange={(value) => handleChange("email", value)}
              errorMessage={errors.email}
            />
          </div>
          {/* パスワード */}
          <div className="register-field">
            <LabelAndTextInput
              labelTitle="パスワード（英数8文字以上）"
              type="password"
              value={form.password}
              onChange={(value) => handleChange("password", value)}
              errorMessage={errors.password}
            />
          </div>
          {/* パスワード確認 */}
          <div className="register-field">
            <LabelAndTextInput
              labelTitle="パスワード確認"
              type="password"
              value={form.passwordConfirmation}
              onChange={(value) => handleChange("passwordConfirmation", value)}
              errorMessage={errors.passwordConfirmation}
            />
          </div>
          {/* ニックネーム */}
          <div className="register-field">
            <LabelAndTextInput
              labelTitle="ニックネーム（8文字以上）"
              value={form.name}
              onChange={(value) => handleChange("name", value)}
              errorMessage={errors.name}
            />
          </div>

          {/* ユーザーアイコン画像 */}
          <div className="register-field flex flex-col items-center">
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

          <div className="register-submit">
            <Button
              name={submitting ? "登録中..." : "登録する"}
              type="submit"
              isDisabled={disabled}
            />
          </div>
        </form>
      </main>
    </div>
  );
};
