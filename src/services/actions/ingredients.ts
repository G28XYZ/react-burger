import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import {
  IActionIngredients,
  Ingredient,
  ISorted,
  IStateIngredients,
} from "../../utils/types";

interface Names {
  [key: string]: string;
}

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const response = await api.getIngredients();
    if (response.success) {
      return response.data;
    }
    return response;
  }
);

export const setDrag = (
  state: IStateIngredients,
  action: PayloadAction<IActionIngredients>
) => {
  state.isDrag = action.payload.onDrag;
};
