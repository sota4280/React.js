import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
import headerReducer from "../features/headerSlice";
import authReducer from "../features/authSlice";
import registerReducer from "../features/registerSlice";
import loginFormReducer from "../features/loginSlice";
import mypageReducer from "../features/mypageSlice";
import postReducer from "../features/postSlice";
import detailReducer from "../features/detailSlice";
import listReducer from "../features/listSlice";

// Reduxストアを作成
export const store = configureStore({
  reducer: {
    // formSliceを登録
    form: formReducer,
    // headerSliceを登録
    header: headerReducer,
    // authSlice登録
    auth: authReducer,
    // 会員登録フォームの入力値を管理するReducer
    register: registerReducer,
    // ログインフォームの入力値を管理するReducer
    loginForm: loginFormReducer,
    //マイページの情報を管理するReducer
    mypage: mypageReducer,
    // 投稿を管理するReducer
    post: postReducer,
    //詳細の情報を管理するReducer
    detail: detailReducer,
    //一覧表示の情報を管理するReducer
    list: listReducer,
  },
  // FileオブジェクトはJSONへ変換できないため、画像に関するActionとStateを
  // Redux Toolkitの直列化チェック対象から除外する
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["register/setRegisterImage"],
        ignoredPaths: ["register.image"],
      },
    }),
});

// Stateの型定義
export type RootState = ReturnType<typeof store.getState>;

// dispatchの型定義
export type AppDispatch = typeof store.dispatch;
