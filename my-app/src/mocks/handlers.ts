import { http, HttpResponse } from "msw";

// 会員登録
export const handlers = [
  http.post("/api/register", async ({ request }) => {
    const body = await request.json();

    // リクエストボディが不正な場合は400エラーを返す
    if (!body || typeof body !== "object") {
      return HttpResponse.json(
        { message: "入力内容を確認してください" },
        { status: 400 },
      );
    }

    // 正常時は実際のAPIの代わりに認証tokenを返す
    return HttpResponse.json({
      token: `register-token-${Date.now()}`,
    });
  }),

  // ログイン
  http.post("/api/login", async ({ request }) => {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return HttpResponse.json(
        { message: "入力内容を確認してください" },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      user: {
        token: `login-token-${Date.now()}`,
      },
    });
  }),
];
