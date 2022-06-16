import { createSlice } from "@reduxjs/toolkit";
import { onLogin, onRegister } from "../actions/user";

const initialState = {
  name: "",
  id: "",
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(onLogin.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
      }
    });
    builder.addCase(onRegister.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
      }
    });
  },
});

export default userSlice;
