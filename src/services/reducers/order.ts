import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { initialBun } from "./../../utils/constants";
import { IStateOrder } from "./../../utils/types";
import { onRegisterOrder } from "./../actions/order";
import {
  addBunToOrder,
  addToOrder,
  deleteInOrder,
  orderTotalPrice,
  setDragged,
  moveIngredient,
  resetOrder,
} from "./../actions/order";

export const initialState = {
  name: "",
  list: [],
  bun: initialBun,
  id: "",
  totalPrice: 0,
  replaceIngredient: null,
};

export const orderSlice = createSlice<IStateOrder, SliceCaseReducers<IStateOrder>>({
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

export default orderSlice;
