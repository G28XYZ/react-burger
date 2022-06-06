import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchIngredients = createAsyncThunk("ingredients/fetchIngredients", async () => {
  const response = await api.getIngredients();
  if (response.success) {
    return response.data;
  }
  return response;
});
