import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import api from "../../utils/api";
import { IAction } from "../../utils/types";

export const ADD_TO_ORDER = "ADD_TO_ORDER";
export const ADD_BUN_TO_ORDER = "ADD_BUN_TO_ORDER";
export const ORDER_TOTAL_PRICE = "ORDER_TOTAL_PRICE";
export const REGISTER_ORDER = "REGISTER_ORDER";

export const registerOrder = createAsyncThunk(
  "order/registerOrder",
  async (ingredients: { ingredients: string[] }) => {
    const response = await api.getOrder(ingredients);
    if (response.success) {
      return response.data;
    }
    return response;
  }
);

export const addBunToOrder = () => {};
