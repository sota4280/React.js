import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { EditFormValues, EditTextField } from "../types/type";

type UpdateTextPayload = {
  key: EditTextField;
  value: string;
};

// 会員登録フォームの初期値
export const initialEditState: EditFormValues = {
  email: "",
  name: "",
  image: null,
};

const editSlice = createSlice({
  name: "edit",
  initialState: initialEditState,
  reducers: {
    // 指定されたテキスト項目を更新する
    updateEditText(state, action: PayloadAction<UpdateTextPayload>) {
      const { key, value } = action.payload;
      state[key] = value;
    },
    // ユーザーが選択した画像ファイルを保持する
    setEditImage(state, action: PayloadAction<File | null>) {
      state.image = action.payload;
    },
    // 登録完了後にフォームを初期状態へ戻す
    resetEditForm() {
      return { ...initialEditState };
    },
  },
});

export const { updateEditText, setEditImage, resetEditForm } =
  editSlice.actions;

export default editSlice.reducer;
