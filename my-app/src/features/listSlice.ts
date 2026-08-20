import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ArticleListResponse } from "../types/type";

type ListState = {
  result: ArticleListResponse | null;
  loading: boolean;
  error: string;
};
const initialState: ListState = { result: null, loading: false, error: "" };
const slice = createSlice({
  name: "list",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = "";
    },
    setArticles(state, action: PayloadAction<ArticleListResponse>) {
      state.result = action.payload;
      state.loading = false;
    },
    setListError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { startLoading, setArticles, setListError } = slice.actions;
export default slice.reducer;
