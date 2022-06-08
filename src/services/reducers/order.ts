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
  draggedIngredient: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addBunToOrder: (state: IOrder, action: PayloadAction<IActionOrder>) => {
      state.bun = action.payload.ingredient;
    },
    addToOrder: (state: IOrder, action: PayloadAction<IActionOrder>) => {
      const ingredient = Object.assign({ shortId: shortId.generate() }, action.payload.ingredient);
      const dragItem = state.draggedIngredient;
      if (dragItem) {
        let newList = [...state.list];
        const hoverIndex = newList.findIndex(
          (item: Ingredient) => dragItem.shortId === item.shortId
        );
        console.log(dragItem);
        // newList[hoverIndex] = Object.assign(dragItem, ingredient);

        state.list = newList;
        state.draggedIngredient = null;
      } else {
        state.list.push(ingredient as never);
        state.draggedIngredient = null;
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
    setDragged: (state: IOrder, action) => {
      let ingredient = Object.assign(action.payload.ingredient);
      state.draggedIngredient = ingredient;
    },

    moveIngredient: (state: IOrder, action) => {
      let from = Object.assign(action.payload.from as Ingredient);
      let to = Object.assign(action.payload.to as Ingredient);
      let newList = [...state.list];
      const toIndex = newList.findIndex((item: Ingredient) => to.shortId === item.shortId);
      const fromIndex = newList.findIndex((item: Ingredient) => from.shortId === item.shortId);
      [newList[toIndex], newList[fromIndex]] = [newList[fromIndex], newList[toIndex]];
      state.list = newList;
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
