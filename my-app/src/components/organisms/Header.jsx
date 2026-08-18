import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { paths } from "../../utils/paths";
import { closeMenu, logout, toggleMenu } from "../../features/headerSlice";
import heroImg from "../../assets/hero.png";
import { clearAccessToken } from "../../utils/auth";
import "../../styles/header.css";

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ReduxからHeaderの状態を取得
  const { isOpen, isLoggedIn } = useSelector((state) => state.header);

  // ログアウトしてトップページへ戻る
  const handleLogout = () => {
    clearAccessToken();
    dispatch(logout());
    navigate(paths.top);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* ロゴ */}
        <Link className="brand" to={paths.top} aria-label="トップページへ">
          <img src={heroImg} width="24" height="24" alt="" />
        </Link>

        {/* スマホ用ハンバーガーボタン */}
        <button
          type="button"
          className="hamburger-button"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isOpen}
          onClick={() => dispatch(toggleMenu())}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* ログイン状態によって表示するリンクを切り替える */}
        <nav className={`global-navigation ${isOpen ? "is-open" : ""}`}>
          {!isLoggedIn ? (
            <>
              <Link
                className="nav-link"
                to={paths.login}
                onClick={() => dispatch(closeMenu())}
              >
                ログイン
              </Link>
              <Link
                className="nav-link"
                to={paths.register}
                onClick={() => dispatch(closeMenu())}
              >
                会員登録
              </Link>
            </>
          ) : (
            <>
              <Link
                className="nav-link"
                to={paths.post}
                onClick={() => dispatch(closeMenu())}
              >
                新規投稿画面
              </Link>
              <Link
                className="nav-link"
                to={paths.list}
                onClick={() => dispatch(closeMenu())}
              >
                投稿一覧画面
              </Link>
              <Link
                className="nav-link"
                to={paths.edit}
                onClick={() => dispatch(closeMenu())}
              >
                会員情報変更
              </Link>
              <Link
                className="nav-link"
                to={paths.mypage}
                onClick={() => dispatch(closeMenu())}
              >
                マイページ
              </Link>
              <button className="nav-link" type="button" onClick={handleLogout}>
                ログアウト
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
