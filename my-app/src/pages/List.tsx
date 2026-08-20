import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getArticles } from "../api/listApi";
import type { AppDispatch, RootState } from "../app/store";
import { Header } from "../components/organisms/Header";
import { setArticles, setListError, startLoading } from "../features/listSlice";
import { paths } from "../utils/paths";
import "../styles/list.css";

const pageNumbers = (current: number, last: number) => {
  const start = Math.max(1, Math.min(current - 2, last - 4));
  return Array.from({ length: Math.min(5, last) }, (_, index) => start + index);
};
export const List = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { result, loading, error } = useSelector(
    (state: RootState) => state.list,
  );
  const [params, setParams] = useSearchParams();
  const requested = Math.max(1, Number(params.get("page")) || 1);
  useEffect(() => {
    dispatch(startLoading());
    getArticles(requested)
      .then((data) => dispatch(setArticles(data)))
      .catch((e) =>
        dispatch(
          setListError(
            e instanceof Error ? e.message : "記事一覧の取得に失敗しました",
          ),
        ),
      );
  }, [dispatch, requested]);
  const current = result?.current_page ?? requested;
  const last = result?.last_page ?? 1;
  const move = (page: number) =>
    setParams(page === 1 ? {} : { page: String(page) });

  return (
    <div className="list-page">
      <Header />
      <main className="list-main">
        <h1>投稿一覧画面</h1>
        {error && (
          <p className="page-message error" role="alert">
            {error}
          </p>
        )}
        <table>
          <thead>
            <tr>
              <th>記事タイトル</th>
              <th>記事内容</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={2}>読み込み中...</td>
              </tr>
            )}
            {!loading && !error && result?.data.length === 0 && (
              <tr>
                <td colSpan={2}>記事がありません</td>
              </tr>
            )}
            {/* IDを参照して詳細に遷移 */}
            {!loading &&
              result?.data.map((article) => (
                <tr key={article.article_id}>
                  <td>{article.title}</td>
                  <td>
                    <Link to={paths.articleDetail(article.article_id)}>
                      {article.content}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* ページネーション */}
        <nav className="pagination">
          <button
            disabled={current === 1 || loading}
            onClick={() => move(current - 1)}
          >
            ◀
          </button>
          {pageNumbers(current, last).map((page) => (
            <button
              key={page}
              className={page === current ? "current" : ""}
              aria-current={page === current ? "page" : undefined}
              disabled={loading}
              onClick={() => move(page)}
            >
              {page}
            </button>
          ))}
          <button
            disabled={current === last || loading}
            onClick={() => move(current + 1)}
          >
            ▶
          </button>
        </nav>
      </main>
    </div>
  );
};
