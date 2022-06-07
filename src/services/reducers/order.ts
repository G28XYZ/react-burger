import { IActionOrder, Ingredient, IOrder } from "../../utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onRegisterOrder } from "../actions/order";

const shortId = require("shortid");

const initialState = {
  name: "",
  list: [],
  bun: {
    _id: "",
    name: "",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
  },
  id: "",
  totalPrice: 0,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addBunToOrder: (state: IOrder, action: PayloadAction<IActionOrder>) => {
      state.bun = action.payload.ingredient;
    },
    addToOrder: (state: IOrder, action: PayloadAction<IActionOrder>) => {
      const item = Object.assign({ shortId: shortId.generate() }, action.payload.ingredient);
      state.list.push(item as never);
    },
    orderTotalPrice: (state: IOrder) => {
      const orderList = state.list as [];
      const bun = state.bun as Ingredient;

      state.totalPrice = orderList.reduce(
        (total: number, item: Ingredient) => total + item.price,
        bun.price * 2
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onRegisterOrder.fulfilled, (state, action) => {
      if (action.payload) {
        const { success, order, name } = action.payload;
        state.id = order.number;
        state.name = name;
      }
    });
  },
});

export default orderSlice;
