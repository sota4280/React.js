import { createSlice } from "@reduxjs/toolkit";

type HeaderState = {
  isOpen: boolean;
  isLoggedIn: boolean;
};

const initialState: HeaderState = {
  // 最初はメニューを閉じる
  isOpen: false,

  // access_tokenがあればログイン済み
  isLoggedIn:
    typeof window !== "undefined" &&
    Boolean(localStorage.getItem("access_token")),
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    // ハンバーガーメニューを開閉する
    toggleMenu(state) {
      state.isOpen = !state.isOpen;
    },

    // メニューを閉じる
    closeMenu(state) {
      state.isOpen = false;
    },

    // ログイン状態にする
    login(state) {
      state.isLoggedIn = true;
      state.isOpen = false;
    },

    // ログアウト状態にする
    logout(state) {
      state.isLoggedIn = false;
      state.isOpen = false;
    },
  },
});

export const { toggleMenu, closeMenu, login, logout } = headerSlice.actions;
export default headerSlice.reducer;
