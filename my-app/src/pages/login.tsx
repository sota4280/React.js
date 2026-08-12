import { type SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/loginApi";
import type { AppDispatch, RootState } from "../app/store";
import { Button, ErrorMessage } from "../components/atoms";
import { LabelAndTextInput } from "../components/molecules";
import { Header } from "../components/organisms/Header";
import { login as setAuthenticated } from "../features/authSlice";
import { login as setHeaderAuthenticated } from "../features/headerSlice";
import { resetLoginForm, updateLoginForm } from "../features/loginSlice";
import type { LoginField } from "../types/type";
import { paths } from "../utils/paths";
import { saveAccessToken } from "../utils/auth";
import { isLoginButtonDisabled, loginValidation } from "../utils/validation";
import "../styles/login.css";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const form = useSelector((state: RootState) => state.loginForm);
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 入力値をRedux Storeへ反映する
  const handleChange = (key: LoginField, value: string) => {
    dispatch(updateLoginForm({ key, value }));
  };

  // 入力された項目だけバリデーションエラーを表示する
  const errors = {
    email: form.email ? loginValidation("email", form.email) : "",
    password: form.password ? loginValidation("password", form.password) : "",
  };

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    // ブラウザー標準のフォーム送信によるページ再読み込みを止める
    event.preventDefault();

    // 未入力やバリデーションエラーがある場合はAPIを実行しない
    if (isLoginButtonDisabled(form)) return;

    // APIエラーを消してからログインする
    setSubmitting(true);
    setApiError("");
    try {
      const token = await loginUser(form);

      // tokenを保存してアプリとHeaderをログイン状態へ更新する
      saveAccessToken(token);
      dispatch(setAuthenticated());
      dispatch(setHeaderAuthenticated());

      // 入力値を初期化してマイページへ移動する
      dispatch(resetLoginForm());
      navigate(paths.mypage);
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "ログインに失敗しました",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <Header />
      <main className="login-main">
        <h1>ログイン</h1>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* ログイン */}
          <LabelAndTextInput
            labelTitle="ログインID（メールアドレス）"
            value={form.email}
            onChange={(value) => handleChange("email", value)}
            errorMessage={errors.email}
          />
          {/* パスワード */}
          <LabelAndTextInput
            labelTitle="パスワード（英数8文字以上）"
            type="password"
            value={form.password}
            onChange={(value) => handleChange("password", value)}
            errorMessage={errors.password}
          />

          {apiError && <ErrorMessage>{apiError}</ErrorMessage>}

          <div className="login-submit">
            <Button
              name={submitting ? "ログイン中..." : "ログインする"}
              type="submit"
              isDisabled={submitting || isLoginButtonDisabled(form)}
            />
          </div>
        </form>
      </main>
    </div>
  );
};
