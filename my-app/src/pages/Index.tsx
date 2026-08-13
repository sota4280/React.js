import { Header } from "../components/organisms/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { paths } from "../utils/paths";
import { login } from "../features/headerSlice";
import heroImg from "../assets/hero.png";
import "../styles/index.css";

export const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ログイン後にこのページが表示された時点でトークンを確認
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));

  // 保存済みトークンをReduxへ反映して、Headerも再レンダリングする
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(login());
    }
  }, []);

  const handleLogin = () => {
    navigate(paths.login);
  };

  const handleRegister = () => {
    navigate(paths.register);
  };

  return (
    <div className="index-page">
      <Header />
      <section className="index-content">
        <h1>ブログサービス課題</h1>

        <p>React.jsを利用したブログサービス課題です。</p>

        {!isLoggedIn && (
          <div className="index-actions">
            <button type="button" onClick={handleLogin}>
              ログイン
            </button>

            <button type="button" onClick={handleRegister}>
              会員登録
            </button>
          </div>
        )}

        <img src={heroImg} alt="" />
      </section>
    </div>
  );
};
