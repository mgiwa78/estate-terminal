import { createSlice } from "@reduxjs/toolkit";

type TinitialState = { theme: "auto" | "dark" | "light" };

const initialState: TinitialState = {
  theme: "light",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
});

// export const { loginSuccess, logout } = settingsSlice.actions;
export default settingsSlice.reducer;
