import { createSlice } from "@reduxjs/toolkit";
import { isAuthenticated } from "../utils/auth";

// 認証状態の型
type AuthState = {
  isLoggedIn: boolean;
};

// 認証状態の初期値
const initialState: AuthState = {
  // アクセストークンがあればログイン済みとする
  isLoggedIn: typeof window !== "undefined" && isAuthenticated(),
};

// ログイン状態を管理するSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ログイン済みの状態に変更する
    login: (state) => {
      state.isLoggedIn = true;
    },

    // 未ログインの状態に変更する
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
