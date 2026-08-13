import type { RegisterFormValues } from "../types/type";

type RegisterResponse = {
  token?: string;
  message?: string;
};

// 画像をBase64へ変換し、APIに不要なデータURL部分を取り除く
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve(String(reader.result).replace(/^data:image\/jpeg;base64,/, ""));
    reader.onerror = () => reject(new Error("画像の読み込みに失敗しました"));
    reader.readAsDataURL(file);
  });

export const registerUser = async (
  form: RegisterFormValues,
): Promise<string> => {
  if (!form.image) throw new Error("画像を選択してください");

  // 画面のフォーム値をAPIのリクエスト形式へ変換して送信する
  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.passwordConfirmation,
      representative_image: await fileToBase64(form.image),
    }),
  });

  // JSONを返さないエラーレスポンスの場合も画面側で処理できるようにする
  const data: RegisterResponse = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message ?? "会員登録に失敗しました");
  }
  if (!data.token) {
    throw new Error("認証トークンを取得できませんでした");
  }

  // 画面側では取得したtokenの保存と遷移だけを行う
  return data.token;
};
