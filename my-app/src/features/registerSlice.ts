import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RegisterFormValues, RegisterTextField } from "../types/type";

type UpdateTextPayload = {
  key: RegisterTextField;
  value: string;
};

// 会員登録フォームの初期値
export const initialRegisterState: RegisterFormValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
  name: "",
  image: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState: initialRegisterState,
  reducers: {
    // 指定されたテキスト項目を更新する
    updateRegisterText(state, action: PayloadAction<UpdateTextPayload>) {
      const { key, value } = action.payload;
      state[key] = value;
    },
    // ユーザーが選択した画像ファイルを保持する
    setRegisterImage(state, action: PayloadAction<File | null>) {
      state.image = action.payload;
    },
    // 登録完了後にフォームを初期状態へ戻す
    resetRegisterForm() {
      return { ...initialRegisterState };
    },
  },
});

export const { updateRegisterText, setRegisterImage, resetRegisterForm } =
  registerSlice.actions;

export default registerSlice.reducer;
