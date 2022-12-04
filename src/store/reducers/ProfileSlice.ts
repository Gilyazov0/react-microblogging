import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { profileUid: string } = { profileUid: "" };

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileUid(state, action: PayloadAction<string>) {
      state.profileUid = action.payload;
    },
  },
});

export default profileSlice.reducer;
