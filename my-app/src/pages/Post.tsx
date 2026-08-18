import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../api/postApi";
import type { AppDispatch, RootState } from "../app/store";
import { Button } from "../components/atoms/Button";
import { Header } from "../components/organisms/Header";
import {
  postFailed,
  resetPost,
  setContent,
  setTitle,
  startPosting,
} from "../features/postSlice";
import { paths } from "../utils/paths";
import "../styles/post.css";

export const Post = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { title, content, loading, error } = useSelector(
    (state: RootState) => state.post,
  );

  const disabled = useMemo(
    () => !title.trim() || !content.trim() || loading,
    [title, content, loading],
  );

  const submit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    if (disabled) return;
    dispatch(startPosting());
    // APIかタイトルとコンテキスト取得
    try {
      const id = await createArticle({
        title: title.trim(),
        content: content.trim(),
      });
      // 初期化
      dispatch(resetPost());
      // 登録した詳細ページに遷移
      navigate(paths.articleDetail(id));
    } catch (e) {
      dispatch(
        postFailed(e instanceof Error ? e.message : "記事の投稿に失敗しました"),
      );
    }
  };

  return (
    <div className="post-page">
      <Header />
      <main className="post-main">
        <h1>新規投稿画面</h1>
        <form onSubmit={submit} className="post-form">
          <input
            placeholder="記事タイトル"
            value={title}
            onChange={(e) => dispatch(setTitle(e.target.value))}
          />
          <label htmlFor="article-content">投稿内容</label>
          <textarea
            id="article-content"
            value={content}
            onChange={(e) => dispatch(setContent(e.target.value))}
          />
          <div className="post-submit">
            <Button
              name={loading ? "投稿中..." : "投稿する"}
              type="submit"
              isDisabled={disabled}
            />
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
        </form>
      </main>
    </div>
  );
};
