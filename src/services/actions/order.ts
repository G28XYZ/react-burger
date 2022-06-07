import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const onRegisterOrder = createAsyncThunk(
  "order/onRegisterOrder",
  async (ingredients: { ingredients: string[] }) => {
    const response = await api.getOrder(ingredients);
    if (response.success) {
      return response;
    }
    return false;
  }
);

export const addBunToOrder = () => {};
