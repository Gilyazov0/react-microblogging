import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ViewType from "../../Types/ViewType";

const initialState: { view: ViewType } = { view: "all tweets" };

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView(state, action: PayloadAction<ViewType>) {
      state.view = action.payload;
    },
  },
});

export default viewSlice.reducer;
