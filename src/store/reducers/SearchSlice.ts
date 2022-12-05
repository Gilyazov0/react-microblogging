import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import SearchAtType from "../../Types/SearchAtType";

interface SearchState {
  searchAt?: SearchAtType;
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
