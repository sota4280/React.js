import type { LoginFormValues } from "../types/type";

type LoginResponse = {
  user?: {
    token: string;
  };
  message?: string;
};

// ログインAPIを実行して、レスポンスから認証tokenを返す
export const loginUser = async (form: LoginFormValues): Promise<string> => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  });

  const data: LoginResponse = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message ?? "ログインに失敗しました");
  }
  if (!data.user?.token) {
    throw new Error("認証トークンを取得できませんでした");
  }

  return data.user.token;
};
