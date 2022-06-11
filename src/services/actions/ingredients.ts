import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { IActionIngredients, IStateIngredients } from "../../utils/types";

export const fetchIngredients = createAsyncThunk("ingredients/fetchIngredients", async () => {
  const response = await api.getIngredients();
  if (response.success) {
    return response.data;
  } else {
    console.log(response);
    return false;
  }
});

export const setDrag = (state: IStateIngredients, action: PayloadAction<IActionIngredients>) => {
  state.isDrag = action.payload.onDrag;
};

export const getIngredients = (
  state: IStateIngredients,
  action: PayloadAction<IActionIngredients>
) => {
  console.log(action);
};
