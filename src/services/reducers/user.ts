import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../../utils/setCookie";
import {
  onGetUser,
  onLogin,
  onRefreshToken,
  onRegister,
} from "../actions/user";

const initialState = {
  name: "",
  email: "",
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(onLogin.fulfilled, (state, action) => {
      if (action.payload.success) {
        const { name, email } = action.payload;
        state.name = name;
        state.email = email;
        const token = action.payload.accessToken.replace("Bearer ", "");
        const refreshToken = action.payload.refreshToken;
        if (token) {
          setCookie("token", token, {});
          setCookie("refreshToken", refreshToken, {});
          sessionStorage.setItem("refreshToken", refreshToken);
        }
        console.log(action.payload);
      }
    });
    builder.addCase(onRegister.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
      }
    });
    builder.addCase(onGetUser.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
      }
    });
    builder.addCase(onRefreshToken.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
      }
    });
  },
});

export default userSlice;
