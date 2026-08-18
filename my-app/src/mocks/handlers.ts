import { http, HttpResponse } from "msw";

type MockUser = {
  name: string;
  email: string;
  representative_image: string;
};

const getMockUser = (): MockUser | null => {
  const savedUser = localStorage.getItem("mock_registered_user");
  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser) as MockUser;
  } catch {
    return null;
  }
};

export const handlers = [
  // 会員登録内容を保存し、認証tokenを返す
  http.post("/api/register", async ({ request }) => {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return HttpResponse.json(
        { message: "入力内容を確認してください" },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      token: `register-token-${Date.now()}`,
    });
  }),

  // 会員登録時のメールアドレスとパスワードをの照合
  http.post("/api/login", async ({ request }) => {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return HttpResponse.json(
        { message: "入力内容を確認してください" },
        { status: 400 },
      );
    }

    const registeredUser = getMockUser();

    if (!registeredUser) {
      return HttpResponse.json(
        { message: "メールアドレスまたはパスワードが正しくありません" },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      user: {
        token: `login-token-${Date.now()}`,
      },
    });
  }),

  // 登録済みユーザーのメールアドレスと画像を返す
  http.get("/api/user", ({ request }) => {
    const authorization = request.headers.get("Authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return HttpResponse.json({ message: "認証が必要です" }, { status: 401 });
    }

    const registeredUser = getMockUser();
    if (!registeredUser) {
      return HttpResponse.json(
        { message: "会員情報が見つかりません" },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      user: {
        name: registeredUser.name,
        email: registeredUser.email,
        representative_image: registeredUser.representative_image,
      },
    });
  }),
];
