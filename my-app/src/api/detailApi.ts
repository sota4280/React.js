import type { ArticleDetail } from "../types/type";
import { getAuthorizationHeader } from "../utils/auth";

//  記事IDに対応する投稿詳細を取得する
export const getArticle = async (articleId: number): Promise<ArticleDetail> => {
  const response = await fetch(`/api/articles/${articleId}`, {
    headers: getAuthorizationHeader(),
  });

  if (!response.ok) {
    const error = (await response.json()) as { message?: string };
    throw new Error(error.message ?? "記事詳細の取得に失敗しました");
  }

  return response.json() as Promise<ArticleDetail>;
};
