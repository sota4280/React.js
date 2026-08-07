import { FormValues, FormErrors } from "../types/type";

// 空欄表示　バリデーション
const requiredKeys: (keyof FormValues)[] = [
  "name",
  "mail",
  "password",
  "confirmPassword",
  "zip",
  "prefecture",
  "municipalities",
  "address",
];

// 入力値のバリデーション
export const validation = (
  key: keyof FormValues,
  value: string,
  form: FormValues,
): string => {
  // 必須項目の空欄チェック
  for (const requiredKey of requiredKeys) {
    if (key === requiredKey && value.trim() === "") {
      return "入力してください";
    }
  }

  // ニックネームは空欄でもエラーにしない
  if (key === "user" && value.trim() === "") {
    return "";
  }

  // メールアドレス
  if (key === "mail" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "正しいメールアドレスを入力してください";
  }

  // パスワード
  if (key === "password" && value.length < 4) {
    return "4文字以上で入力してください";
  }

  // パスワード確認
  if (key === "confirmPassword" && value !== form.password) {
    return "パスワードが一致しません";
  }

  // 郵便番号
  if (key === "zip" && !/^\d{7}$/.test(value)) {
    return "ハイフンなしの半角数字7桁を入力してください";
  }

  return "";
};

// 登録ボタンの非活性判定
export const isButtonDisabled = (
  form: FormValues,
  error: FormErrors,
): boolean => {
  // 1つでもエラーがある
  const hasError = Object.values(error).some((value) => value !== "");

  // user以外に未入力がある
  const hasEmpty = requiredKeys.some((key) => form[key].trim() === "");

  return hasError || hasEmpty;
};
