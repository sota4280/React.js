import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FormValues } from "../types/type";

// フォームの初期値
const initialState: FormValues = {
  name: "",
  user: "",
  mail: "",
  password: "",
  confirmPassword: "",
  zip: "",
  prefecture: "",
  municipalities: "",
  address: "",
};

// 1項目だけ更新するときの型
type UpdateFormPayload = {
  key: keyof FormValues;
  value: string;
};

// 郵便番号検索で住所を設定するときの型
type SetAddressPayload = {
  prefecture: string;
  municipalities: string;
};

// フォームの更新と検索結果
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // フォームの1項目を更新
    updateForm(state, action: PayloadAction<UpdateFormPayload>) {
      const { key, value } = action.payload;
      state[key] = value;
    },

    // 住所検索結果を設定
    setAddress(state, action: PayloadAction<SetAddressPayload>) {
      const { prefecture, municipalities } = action.payload;

      state.prefecture = prefecture;
      state.municipalities = municipalities;
      state.address = "";
    },

    // フォームを初期状態に戻す
    resetForm() {
      return { ...initialState };
    },
  },
});

// 更新・追加・入力　状態を管理
export const { updateForm, setAddress, resetForm } = formSlice.actions;

// formレンダー実行
export default formSlice.reducer;
