import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "./../../utils/auth";

export const onLogin = createAsyncThunk("user/onLogin", async (form: {}) => {
  const response = await auth.login(form);
  if (response.success || response.result === "OK") {
    return response;
  } else {
    console.log(response);
    return false;
  }
});

export const onRegister = createAsyncThunk("user/onRegister", async (form: {}) => {
  const response = await auth.register(form);
  if (response.success) {
    return response;
  } else {
    console.log(response);
    return false;
  }
});

export const onForgotPassword = createAsyncThunk("user/onForgotPassword", async (email: string) => {
  const response = await auth.forgotPassword(email);
  if (response.success) {
    return response;
  } else {
    console.log(response);
    return false;
  }
});

export const onResetPassword = createAsyncThunk(
  "user/onResetPassword",
  async ({ password, token }: { [key: string]: string }) => {
    const response = await auth.resetPassword(password, token);
    if (response.success) {
      return response;
    } else {
      console.log(response);
      return false;
    }
  }
);

export const onRefreshToken = createAsyncThunk("user/onRefreshToken", async (token: string) => {
  const response = await auth.refreshToken(token);
  if (response.success) {
    return response;
  } else {
    console.log(response);
    return false;
  }
});

export const onGetUser = createAsyncThunk("user/onGetUser", async (token: string) => {
  const response = await auth.getUser(token);
  if (response.success) {
    return response;
  } else {
    console.log(response);
    return false;
  }
});

export const onLogout = createAsyncThunk("user/onLogout", async (token: string) => {
  const response = await auth.logout(token);
  if (response.success) {
    return response;
  } else {
    console.log(response);
    return false;
  }
});
