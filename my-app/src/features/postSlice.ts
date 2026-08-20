import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  content: "",
  loading: false,
  error: "",
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setContent(state, action: PayloadAction<string>) {
      state.content = action.payload;
    },
    startPosting(state) {
      state.loading = true;
      state.error = "";
    },
    postFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPost() {
      return initialState;
    },
  },
});

export const { setTitle, setContent, startPosting, postFailed, resetPost } =
  slice.actions;

export default slice.reducer;
