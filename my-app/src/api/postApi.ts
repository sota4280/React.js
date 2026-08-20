import type { PostText } from "../types/type";
import { getAuthorizationHeader } from "../utils/auth";

type CreateArticleResponse = {
  article_id: number;
};

// 記事を新規作成し、作成された記事IDを返す。
export const createArticle = async (values: PostText): Promise<number> => {
  const response = await fetch("/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const error = (await response.json()) as { message?: string };
    throw new Error(error.message ?? "記事の投稿に失敗しました");
  }

  const data = (await response.json()) as Partial<CreateArticleResponse>;
  if (typeof data.article_id !== "number") {
    throw new Error("記事IDを取得できませんでした");
  }

  return data.article_id;
};
