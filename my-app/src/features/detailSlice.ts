import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ArticleDetail } from "../types/type";

type DetailState = {
  article: ArticleDetail | null;
  loading: boolean;
  error: string;
};

const initialState: DetailState = { article: null, loading: false, error: "" };
const slice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = "";
      state.article = null;
    },
    setArticle(state, action: PayloadAction<ArticleDetail>) {
      state.article = action.payload;
      state.loading = false;
    },
    setDetailError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { startLoading, setArticle, setDetailError } = slice.actions;

export default slice.reducer;
