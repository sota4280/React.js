import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthenticationError, getCurrentUser } from "../api/mypageApi";
import type { AppDispatch, RootState } from "../app/store";
import { Header } from "../components/organisms/Header";
import { setMyPageError, setUser, startLoading } from "../features/mypageSlice";
import { clearAccessToken, getAccessToken } from "../utils/auth";
import { paths } from "../utils/paths";
import "../styles/mypage.css";

export const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.mypage,
  );

  useEffect(() => {
    // tokenがない、または60分の有効期限が切れている場合はログインへ戻す
    if (!getAccessToken()) {
      navigate(paths.login, { replace: true });
      return;
    }

    dispatch(startLoading());

    // Bearer tokenを付けてログイン中の会員情報を取得する
    getCurrentUser()
      .then((userData) => dispatch(setUser(userData)))
      .catch((apiError: unknown) => {
        if (apiError instanceof AuthenticationError) {
          clearAccessToken();
          navigate(paths.login, { replace: true });
          return;
        }

        dispatch(
          setMyPageError(
            apiError instanceof Error
              ? apiError.message
              : "会員情報の取得に失敗しました",
          ),
        );
      });
  }, []);

  // アイコン未登録時はunknown.pngを表示する
  const imageSrc = user?.representative_image
    ? `data:image/jpeg;base64,${user.representative_image}`
    : "/unknown.png";

  return (
    <div className="mypage-page">
      <Header />
      <main className="mypage-main">
        {loading && <p>読み込み中...</p>}
        {user && (
          <div className="mypage-profile">
            <img src={imageSrc} alt="ユーザーアイコン" />
            <p>{user.email}</p>
          </div>
        )}
        {error && <p>{error}</p>}
      </main>
    </div>
  );
};
