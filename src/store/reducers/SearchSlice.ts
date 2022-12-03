import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchAt?: "tweets" | "users";
  query?: string;
}
const initialState: SearchState = {
  searchAt: "tweets",
  query: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchParams(state, action: PayloadAction<SearchState>) {
      return { ...state, ...action.payload };
    },
  },
});

export default searchSlice.reducer;
