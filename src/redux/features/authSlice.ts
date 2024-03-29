import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthState, User } from "src/types/index";

const initialState: AuthState = {
  isLoggedIn: Boolean(localStorage.getItem("token")),
  user: {
    email: "",
    name: "",
    _id: "",
    image: "./img/defaultFace.png",
  },
};
const DOMAIN = (
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_STATIC_DOMAIN
    : process.env.REACT_APP_DEV_STATIC_DOMAIN
) as string;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginState: (
      state,
      action: PayloadAction<{ token: string; user: User }>,
    ) => {
      localStorage.setItem("token", action.payload.token);
      state.isLoggedIn = true;
      state.user = action.payload.user;

      state.user.image = action.payload.user.image
        ? DOMAIN + action.payload.user.image
        : "/img/defaultFace.png";
    },
    setLogoutState: (state) => {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.user = initialState.user;
    },
    updateImage: (state, action: PayloadAction<{ image: string }>) => {
      state.user.image = `${DOMAIN}${action.payload.image}`;
    },
  },
});

export const { setLoginState, setLogoutState, updateImage } = authSlice.actions;
export const authReducer = authSlice.reducer;
