import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  username: string;
  email: string;
}

const initialState: UserState = {
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state: UserState) => {
      state.username = "";
      state.email = "";
    },
    setUserInfo(state: UserState, { payload }: PayloadAction<UserState>) {
      state.username = payload.username;
      state.email = payload.email;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
