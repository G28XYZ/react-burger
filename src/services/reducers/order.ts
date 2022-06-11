import { createSlice } from "@reduxjs/toolkit";
import { initialBun } from "../../utils/constants";
import { onRegisterOrder } from "../actions/order";
import {
  addBunToOrder,
  addToOrder,
  deleteInOrder,
  orderTotalPrice,
  setDragged,
  moveIngredient,
  resetOrder,
} from "../actions/order";

const initialState = {
  name: "",
  list: [],
  bun: initialBun,
  id: "",
  totalPrice: 0,
  replaceIngredient: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addBunToOrder,
    addToOrder,
    deleteInOrder,
    orderTotalPrice,
    setDragged,
    moveIngredient,
    resetOrder,
  },
  extraReducers: (builder) => {
    builder.addCase(onRegisterOrder.fulfilled, (state, action) => {
      if (action.payload) {
        const { order, name } = action.payload;
        state.id = order.number;
        state.name = name;
      }
    });
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
