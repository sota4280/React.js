import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/type";

type MyPageState = {
  user: User | null;
  loading: boolean;
  error: string;
};

const initialState: MyPageState = {
  user: null,
  loading: false,
  error: "",
};

const mypageSlice = createSlice({
  name: "mypage",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = "";
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
    },
    setMyPageError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    resetMyPage() {
      return initialState;
    },
  },
});

export const { startLoading, setUser, setMyPageError, resetMyPage } =
  mypageSlice.actions;

export default mypageSlice.reducer;
