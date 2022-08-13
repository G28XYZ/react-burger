import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../utils/api";
import { TCaseReducerIngredients } from "./../../utils/types";

export const fetchIngredients = createAsyncThunk("ingredients/fetchIngredients", async () => {
  const response = await api.getIngredients();
  if (response.success || response.result === "OK") {
    return response;
  } else {
    console.log(response);
    return false;
  }
});

export const setDrag: TCaseReducerIngredients = (state, action) => {
  state.isDrag = action.payload.onDrag;
};

export const setLoading: TCaseReducerIngredients = (state, action) => {
  state.loading = action.payload.loading;
};
