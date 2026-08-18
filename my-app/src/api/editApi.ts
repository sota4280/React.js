import type { EditFormValues } from "../types/type";

type EditResponse = {
  token?: string;
  message?: string;
};

// 画像をマイページでそのまま表示できるData URLへ変換する
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("画像の読み込みに失敗しました"));
    reader.readAsDataURL(file);
  });

export const editUser = async (form: EditFormValues): Promise<string> => {
  if (!form.image) throw new Error("画像を選択してください");

  // 画面のフォーム値をAPIのリクエスト形式へ変換して送信する
  const response = await fetch("/api/edit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      representative_image: await fileToBase64(form.image),
    }),
  });

  // JSONを返さないエラーレスポンスの場合も画面側で処理できるようにする
  const data: EditResponse = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message ?? "会員情報変更に失敗しました");
  }
  if (!data.token) {
    throw new Error("認証トークンを取得できませんでした");
  }

  return data.token;
};
