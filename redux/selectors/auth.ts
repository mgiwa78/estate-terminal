import { RootState } from "../store.js";

export const selectAuth = (state: RootState) => state.auth;

export const selectRole = (state: RootState) => selectAuth(state).role;
export const selectUser = (state: RootState) => selectAuth(state).user;
export const selectIsUserLoggedIn = (state: RootState) =>
  selectAuth(state).isLoggedIn;
