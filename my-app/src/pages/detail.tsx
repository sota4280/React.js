import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getArticle } from "../api/detailApi";
import type { AppDispatch, RootState } from "../app/store";
import { Header } from "../components/organisms/Header";
import {
  setArticle,
  setDetailError,
  startLoading,
} from "../features/detailSlice";
import "../styles/detaile.css";

export const Detail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { article, loading, error } = useSelector(
    (state: RootState) => state.detail,
  );
  const id = Number(useParams().articleId);

  // IDを参照して、表示情報取得
  useEffect(() => {
    if (!Number.isInteger(id)) {
      dispatch(setDetailError("記事IDが正しくありません"));
      return;
    }
    dispatch(startLoading());
    getArticle(id)
      .then((data) => dispatch(setArticle(data)))
      .catch((e) =>
        dispatch(
          setDetailError(
            e instanceof Error ? e.message : "記事詳細の取得に失敗しました",
          ),
        ),
      );
  }, [dispatch, id]);

  return (
    <div className="detail-page">
      <Header />
      <main className="detail-main">
        <h1>投稿詳細画面</h1>
        {loading && <p>読み込み中...</p>}
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {article && (
          <article className="detail-card">
            <p className="article-user">{article.user_name}</p>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </article>
        )}
      </main>
    </div>
  );
};
