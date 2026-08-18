import type {
  FormErrors,
  FormValues,
  RegisterFormValues,
  RegisterTextField,
  LoginField,
  LoginFormValues,
  EditFormValues,
  EditTextField,
} from "../types/type";

// 空欄表示　バリデーション
const requiredKeys: (keyof FormValues)[] = [
  "name",
  "email",
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
  if (key === "username" && value.trim() === "") {
    return "";
  }

  // メールアドレス
  if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
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

// 会員登録バリデーション
export const registerValidation = (
  key: RegisterTextField,
  value: string,
  form: RegisterFormValues,
): string => {
  // ログインIDがメールアドレス形式になっているか確認する
  if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "メールアドレスの形式が正しくありません";
  }

  // パスワードが半角英数字8文字以上か確認する
  if (key === "password" && !/^[A-Za-z0-9]{8,}$/.test(value)) {
    return "半角英数字8文字以上で入力してください";
  }

  // 確認用パスワードが入力したパスワードと一致するか確認する
  if (key === "passwordConfirmation" && value !== form.password) {
    return "パスワードが一致しません";
  }

  // ニックネームが8文字以上か確認する
  if (key === "name" && value.length < 8) {
    return "8文字以上で入力してください";
  }

  return "";
};

// 画像が選択され、ファイル形式と拡張子の両方がJPEGか確認する
export const registerImageValidation = (file: File | null): string => {
  if (!file) return "画像を選択してください";

  return file.type === "image/jpeg" && /\.jpe?g$/i.test(file.name)
    ? ""
    : "jpg画像を選択してください";
};

export const isRegisterButtonDisabled = (form: RegisterFormValues): boolean => {
  // 会員登録で入力が必要なテキスト項目
  const textFields: RegisterTextField[] = [
    "email",
    "password",
    "passwordConfirmation",
    "name",
  ];
  // 未入力またはバリデーションエラーの項目が1つでもあるか確認する
  const hasInvalidText = textFields.some(
    (key) => !form[key].trim() || registerValidation(key, form[key], form),
  );

  // テキストまたは画像に問題がある場合は登録ボタンを無効にする
  return Boolean(hasInvalidText || registerImageValidation(form.image));
};

// ログイン画面の項目別バリデーション
export const loginValidation = (key: LoginField, value: string): string => {
  if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "メールアドレスの形式で入力してください";
  }

  if (key === "password" && !/^[A-Za-z0-9]{8,}$/.test(value)) {
    return "英数8文字以上で入力してください";
  }

  return "";
};

// 未入力またはバリデーションエラーがある場合はログインボタンを無効にする
export const isLoginButtonDisabled = (form: LoginFormValues): boolean =>
  !form.email.trim() ||
  !form.password.trim() ||
  Boolean(loginValidation("email", form.email)) ||
  Boolean(loginValidation("password", form.password));

// 変更項目バリデーション
export const editValidation = (key: EditTextField, value: string): string => {
  // ログインIDがメールアドレス形式になっているか確認する
  if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "メールアドレスの形式が正しくありません";
  }

  // ニックネームが8文字以上か確認する
  if (key === "name" && value.length < 8) {
    return "8文字以上で入力してください";
  }

  return "";
};

// 編集用のバリデーション
export const isEditButtonDisabled = (form: EditFormValues): boolean => {
  // 会員登録で入力が必要なテキスト項目
  const textFields: EditTextField[] = ["email", "name"];
  // 未入力またはバリデーションエラーの項目が1つでもあるか確認する
  const hasInvalidText = textFields.some(
    (key) => !form[key].trim() || editValidation(key, form[key]),
  );

  // テキストまたは画像にエラーがある場合は登録ボタンを無効にする
  return Boolean(hasInvalidText || registerImageValidation(form.image));
};
