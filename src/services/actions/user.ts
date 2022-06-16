import { createAsyncThunk } from "@reduxjs/toolkit";
import auth from "../../utils/auth";

export const onLogin = createAsyncThunk("user/onLogin", async (form: {}) => {
  const response = await auth.login(form);
  if (response.success) {
    return response;
  } else {
    console.log(response);
    return false;
  }
});

export const onRegister = createAsyncThunk(
  "user/onRegister",
  async (form: {}) => {
    const response = await auth.register(form);
    if (response.success) {
      return response;
    } else {
      console.log(response);
      return false;
    }
  }
);

export const onRefreshToken = createAsyncThunk(
  "user/onRefreshToken",
  async (token: string) => {
    const response = await auth.refreshToken(token);
    if (response.success) {
      return response;
    } else {
      console.log(response);
      return false;
    }
  }
);

export const onGetUser = createAsyncThunk("user/onGetUser", async () => {
  const response = await auth.getUser();
  console.log(response);
  if (response.success) {
    return response;
  } else {
    console.log(response);
    return false;
  }
});
