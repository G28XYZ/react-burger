import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { IActionIngredients, IStateIngredients, TCaseReducerIngredients } from "../../utils/types";

export const fetchIngredients = createAsyncThunk("ingredients/fetchIngredients", async () => {
  const response = await api.getIngredients();
  if (response.success) {
    return response.data;
  } else {
    console.log(response);
    return false;
  }
});

export const setDrag: TCaseReducerIngredients = (state, action) => {
  state.isDrag = action.payload.onDrag;
};

export const setLoading = (state: IStateIngredients, action: PayloadAction<IActionIngredients>) => {
  state.loading = action.payload.request as boolean;
};
