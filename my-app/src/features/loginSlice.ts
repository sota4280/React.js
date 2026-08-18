import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginField, LoginFormValues } from "../types/type";

type UpdateLoginPayload = {
  key: LoginField;
  value: string;
};

export const initialLoginState: LoginFormValues = {
  email: "",
  password: "",
};

const loginSlice = createSlice({
  name: "loginForm",
  initialState: initialLoginState,
  reducers: {
    // 指定されたログイン項目を更新する
    updateLoginForm(state, action: PayloadAction<UpdateLoginPayload>) {
      const { key, value } = action.payload;
      state[key] = value;
    },
    // 初期状態に戻す
    resetLoginForm() {
      return { ...initialLoginState };
    },
  },
});

export const { updateLoginForm, resetLoginForm } = loginSlice.actions;
export default loginSlice.reducer;
