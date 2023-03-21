import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  username: string;
  email: string;
}

const initialState: CounterState = {
  username: "",
  email: ""
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    logout: (state: CounterState) => {
      state.username = "";
      state.email = "";
    },
    setUserInfo(state: CounterState, { payload }: PayloadAction<CounterState>) {
      state.username = payload.username;
      state.email = payload.email;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout, setUserInfo } = counterSlice.actions;

export default counterSlice.reducer;
