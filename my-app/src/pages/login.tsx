import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Header } from "../components/organisms/Header";
import { login } from "../features/headerSlice";
import { paths } from "../utils/paths";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    localStorage.setItem("access_token", `${Date.now()}`);
    dispatch(login());
    navigate(paths.index);
  };

  return (
    <div className="login-page">
      <Header />
      <main>
        <h1>ログイン</h1>
        <button type="button" onClick={handleLogin}>
          ログインする
        </button>
      </main>
    </div>
  );
};
