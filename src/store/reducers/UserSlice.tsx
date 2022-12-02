import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserData from "../../Types/userData";

const initialState: { user: UserData | undefined | null } = { user: undefined };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData | undefined | null>) {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
