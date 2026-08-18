import type { ArticleListResponse } from "../types/type";
import { getAuthorizationHeader } from "../utils/auth";

// 指定ページの記事一覧とページネーション情報を取得する。

export const getArticles = async (
  page: number,
): Promise<ArticleListResponse> => {
  const searchParams = new URLSearchParams({ page: String(page) });
  const response = await fetch(`/api/articles?${searchParams}`, {
    headers: getAuthorizationHeader(),
  });

  if (!response.ok) {
    const error = (await response.json()) as { message?: string };
    throw new Error(error.message ?? "記事一覧の取得に失敗しました");
  }

  return response.json() as Promise<ArticleListResponse>;
};
