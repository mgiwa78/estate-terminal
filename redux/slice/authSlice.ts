import { createSlice } from "@reduxjs/toolkit";
import User from "../../types/User";

type AuthState = {
  role: "user" | null;
  user: User | null;
  isLoggedIn: boolean;
};
const initialState: AuthState = {
  role: null,
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      console.log(action);
      state.user = action.payload;
      state.role = action.payload.role;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.role = null;
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
