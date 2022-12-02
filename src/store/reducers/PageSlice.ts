import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Pages from "../../Types/Pages";

const initialState: { page: Pages } = { page: "Home" };

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<Pages>) {
      state.page = action.payload;
    },
  },
});

export default pageSlice.reducer;
