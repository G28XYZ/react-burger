import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { setCookie } from "./../../utils/setCookie";
import { setSessionStorage } from "./../../utils/setSessionStorage";
import { IStateUser } from "./../../utils/types";
import {
  onForgotPassword,
  onGetUser,
  onLogin,
  onLogout,
  onRefreshToken,
  onRegister,
  onResetPassword,
} from "./../actions/user";

export const initialState = {
  name: "",
  email: "",
  loggedIn: false,
};

export const userSlice = createSlice<IStateUser, SliceCaseReducers<IStateUser>>({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(onLogin.fulfilled, (state, action) => {
      const { accessToken, refreshToken, success, user } = action.payload;
      const token = accessToken.replace("Bearer ", "");
      if (token) {
        setCookie("token", token, {});
        setCookie("refreshToken", refreshToken, {});
        setSessionStorage("token", token);
        setSessionStorage("refreshToken", refreshToken);
        state.name = user.name;
        state.email = user.email;
        state.loggedIn = success;
      } else {
        state.loggedIn = false;
      }
    });

    builder.addCase(onRegister.fulfilled, (state, action) => {
      const { accessToken, refreshToken, success, user } = action.payload;
      const token = accessToken.replace("Bearer ", "");
      if (token) {
        setCookie("token", token, {});
        setCookie("refreshToken", refreshToken, {});
        setSessionStorage("token", token);
        setSessionStorage("refreshToken", refreshToken);
        state.name = user.name;
        state.email = user.email;
        state.loggedIn = success;
      } else {
        state.loggedIn = false;
      }
    });

    builder.addCase(onGetUser.fulfilled, (state, action) => {
      const { success, user } = action.payload;
      if (success) {
        state.email = user.email;
        state.name = user.name;
        state.loggedIn = true;
      } else {
        state.email = "";
        state.name = "";
        state.loggedIn = false;
      }
    });

    builder.addCase(onRefreshToken.fulfilled, (state, action) => {
      const { accessToken, refreshToken, success } = action.payload;
      const token = accessToken.replace("Bearer ", "");
      if (token) {
        setCookie("token", token, {});
        setCookie("refreshToken", refreshToken, {});
        setSessionStorage("token", token);
        setSessionStorage("refreshToken", refreshToken);
        state.loggedIn = success;
      } else {
        state.loggedIn = false;
      }
    });

    builder.addCase(onLogout.fulfilled, (state, action) => {
      const { success } = action.payload;
      if (success) {
        sessionStorage.clear();
        setCookie("token", "", {});
        setCookie("refreshToken", "", {});
        state.loggedIn = false;
        state.name = "";
        state.email = "";
      } else {
        console.log("Ошибка выхода из системы");
      }
    });

    builder.addCase(onForgotPassword.fulfilled, (state, action) => {
      const { success, message } = action.payload;
      if (success) {
        console.log(message);
      } else {
        console.log("Ошибка восстановления пароля");
      }
    });

    builder.addCase(onResetPassword.fulfilled, (state, action) => {
      const { success, message } = action.payload;
      if (success) {
        console.log(message);
      } else {
        console.log("Ошибка сброса пароля");
      }
    });
  },
});

export default userSlice;
