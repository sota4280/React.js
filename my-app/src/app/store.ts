import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
import headerReducer from "../features/headerSlice";

// Reduxストアを作成
export const store = configureStore({
  reducer: {
    // formSliceを登録
    form: formReducer,
    // headerSliceを登録
    header: headerReducer,
  },
});

// Stateの型定義
export type RootState = ReturnType<typeof store.getState>;

// dispatchの型定義
export type AppDispatch = typeof store.dispatch;
