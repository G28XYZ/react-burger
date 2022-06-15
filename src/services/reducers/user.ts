import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/user";

const initialState = {
  name: "",
  id: "",
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    login,
  },
});

export default userSlice;
