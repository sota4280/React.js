import { http, HttpResponse } from "msw";

type MockUser = {
  name: string;
  email: string;
  password: string;
  representative_image: string;
};

const REGISTERED_USER_KEY = "mock_registered_user";
const ARTICLES_KEY = "mock_articles_v2";

type MockArticle = {
  article_id: number;
  title: string;
  content: string;
  user_name: string;
};

// 1ページ15件で7ページ目まで確認するための仮データ
const mockArticles: MockArticle[] = Array.from({ length: 100 }, (_, index) => ({
  article_id: index + 1,
  title: `サンプル ${index + 1}`,
  content: "サンプル投稿",
  user_name: "SOZO",
}));

const getArticles = (): MockArticle[] => {
  const savedArticles = localStorage.getItem(ARTICLES_KEY);
  return savedArticles
    ? (JSON.parse(savedArticles) as MockArticle[])
    : mockArticles;
};

const getMockUser = (): MockUser | null => {
  const savedUser = localStorage.getItem(REGISTERED_USER_KEY);
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

    const user = body as Partial<MockUser>;
    if (!user.name || !user.email || !user.password) {
      return HttpResponse.json(
        { message: "入力内容を確認してください" },
        { status: 400 },
      );
    }

    // 情報をローカルストレージに保存するモック
    const registeredUser: MockUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      representative_image: user.representative_image ?? "",
    };
    localStorage.setItem(REGISTERED_USER_KEY, JSON.stringify(registeredUser));

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

    // ログイン制御
    const credentials = body as { email?: string; password?: string };
    const registeredUser = getMockUser();

    if (
      !registeredUser ||
      registeredUser.email !== credentials.email ||
      registeredUser.password !== credentials.password
    ) {
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

  // 記事投稿内容を保存して、記事IDを返す
  http.post("/api/articles", async ({ request }) => {
    const body = (await request.json()) as {
      title: string;
      content: string;
    };

    if (!body?.title?.trim() || !body.content?.trim()) {
      return HttpResponse.json(
        { message: "入力内容を確認してください" },
        { status: 400 },
      );
    }

    const articles = getArticles();
    const articleId =
      articles.reduce((max, item) => Math.max(max, item.article_id), 0) + 1;
    const user = getMockUser();
    articles.unshift({
      article_id: articleId,
      title: body.title.trim(),
      content: body.content.trim(),
      user_name: user?.name ?? "ゲストユーザー",
    });
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));

    return HttpResponse.json({ article_id: articleId }, { status: 201 });
  }),

  // 記事一覧とページネーション情報を返す
  http.get("/api/articles", ({ request }) => {
    const url = new URL(request.url);
    const articles = getArticles();
    const perPage = 15;
    const lastPage = Math.max(1, Math.ceil(articles.length / perPage));
    const currentPage = Math.min(
      lastPage,
      Math.max(1, Number(url.searchParams.get("page")) || 1),
    );
    const startIndex = (currentPage - 1) * perPage;
    const data = articles.slice(startIndex, startIndex + perPage);

    return HttpResponse.json({
      current_page: currentPage,
      last_page: lastPage,
      data,
    });
  }),

  // 指定された記事IDの記事詳細を返す
  http.get("/api/articles/:articleId", ({ params }) => {
    const article = getArticles().find(
      (item) => item.article_id === Number(params.articleId),
    );
    if (!article) {
      return HttpResponse.json(
        { message: "記事が見つかりません" },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      article_id: article.article_id,
      title: article.title,
      content: article.content,
      user_name: article.user_name,
    });
  }),
];
