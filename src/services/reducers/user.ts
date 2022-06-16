import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../../utils/setCookie";
import { onGetUser, onLogin, onLogout, onRefreshToken, onRegister } from "../actions/user";

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
      const { accessToken, refreshToken, success } = action.payload;
      const token = accessToken.replace("Bearer ", "");
      if (token) {
        setCookie("token", token, {});
        setCookie("refreshToken", refreshToken, {});
        sessionStorage.setItem("refreshToken", refreshToken);
        state.loggedIn = success;
      } else {
        state.loggedIn = false;
      }
    });

    builder.addCase(onRegister.fulfilled, (state, action) => {
      const { accessToken, refreshToken, success } = action.payload;
      const token = accessToken.replace("Bearer ", "");
      if (token) {
        setCookie("token", token, {});
        setCookie("refreshToken", refreshToken, {});
        sessionStorage.setItem("refreshToken", refreshToken);
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
        sessionStorage.setItem("refreshToken", refreshToken);
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
  },
});

export default userSlice;
