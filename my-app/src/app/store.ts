import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";

// Reduxストアを作成
export const store = configureStore({
  reducer: {
    // formSliceを登録
    form: formReducer,
  },
});

// Stateの型定義
export type RootState = ReturnType<typeof store.getState>;

// dispatchの型定義
export type AppDispatch = typeof store.dispatch;
