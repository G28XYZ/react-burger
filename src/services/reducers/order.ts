import { IActionOrder, Ingredient, IOrder } from "../../utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onRegisterOrder } from "../actions/order";

const shortId = require("shortid");

const initialState = {
  name: "",
  list: [],
  bun: {
    _id: "",
    name: "Булка",
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
  replaceIngredient: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addBunToOrder: (state: IOrder, action: PayloadAction<IActionOrder>) => {
      state.bun = action.payload.ingredient as Ingredient;
    },
    addToOrder: (state: IOrder, action: PayloadAction<IActionOrder>) => {
      const ingredient = Object.assign(
        { shortId: shortId.generate() },
        action.payload.ingredient
      );
      const replaceItem = action.payload.replaceIngredient as Ingredient;
      let newList = [...state.list];
      if (replaceItem) {
        const replaceIndex = newList.findIndex(
          (item: Ingredient) => replaceItem.shortId === item.shortId
        );
        newList.splice(replaceIndex, 1, ingredient as Ingredient);
        state.list = newList;
        state.replaceIngredient = null;
      } else {
        state.list.push(ingredient as never);
      }
    },
    orderTotalPrice: (state: IOrder) => {
      const orderList = state.list as [];
      const bun = state.bun as Ingredient;

      state.totalPrice = orderList.reduce(
        (total: number, item: Ingredient) => total + item.price,
        bun.price * 2
      );
    },
    setDragged: (state: IOrder, action: PayloadAction<IActionOrder>) => {
      state.replaceIngredient = action.payload.ingredient as Ingredient | null;
    },

    moveIngredient: (state: IOrder, action: PayloadAction<IActionOrder>) => {
      let from = Object.assign(action.payload.from as Ingredient);
      let to = Object.assign(action.payload.to as Ingredient);
      let newList = [...state.list];
      const toIndex = newList.findIndex(
        (item: Ingredient) => to.shortId === item.shortId
      );
      const fromIndex = newList.findIndex(
        (item: Ingredient) => from.shortId === item.shortId
      );
      [newList[toIndex], newList[fromIndex]] = [
        newList[fromIndex],
        newList[toIndex],
      ];
      state.list = newList;
    },
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
