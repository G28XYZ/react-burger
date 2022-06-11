import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { initialBun } from "../../utils/constants";
import { IActionOrder, Ingredient, IOrderState } from "../../utils/types";
const shortId = require("shortid");

export const ORDER_ACTIONS = {
  SET_COUNT: "SET_COUNT",
};

export const onRegisterOrder = createAsyncThunk(
  "order/onRegisterOrder",
  async (ingredients: { ingredients: string[] }) => {
    const response = await api.getOrder(ingredients);
    if (response.success) {
      return response;
    } else {
      console.log(response);
      return false;
    }
  }
);

export const deleteInOrder = (state: IOrderState, action: PayloadAction<IActionOrder>) => {
  const deletedItem = action.payload.deletedItem as Ingredient;
  state.list = state.list.filter((item: Ingredient) => item.shortId !== deletedItem.shortId);
};

export const addBunToOrder = (state: IOrderState, action: PayloadAction<IActionOrder>) => {
  state.bun = action.payload.ingredient as Ingredient;
};

export const addToOrder = (state: IOrderState, action: PayloadAction<IActionOrder>) => {
  const ingredient = Object.assign({ shortId: shortId.generate() }, action.payload.ingredient);
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
};

export const orderTotalPrice = (state: IOrderState) => {
  const orderList = state.list as [];
  const bun = state.bun as Ingredient;

  state.totalPrice = orderList.reduce(
    (total: number, item: Ingredient) => total + item.price,
    bun.price * 2
  );
};

export const setDragged = (state: IOrderState, action: PayloadAction<IActionOrder>) => {
  state.replaceIngredient = action.payload.ingredient as Ingredient | null;
};

export const moveIngredient = (state: IOrderState, action: PayloadAction<IActionOrder>) => {
  let from = Object.assign(action.payload.from as Ingredient);
  let to = Object.assign(action.payload.to as Ingredient);
  let newList = [...state.list];
  const toIndex = newList.findIndex((item: Ingredient) => to.shortId === item.shortId);
  const fromIndex = newList.findIndex((item: Ingredient) => from.shortId === item.shortId);
  [newList[toIndex], newList[fromIndex]] = [newList[fromIndex], newList[toIndex]];
  state.list = newList;
};

export const resetOrder = (state: IOrderState) => {
  state.list = [];
  state.bun = initialBun;
  state.id = "";
};

export const setCount = (state: IOrderState, actions: IActionOrder) => {
  console.log(actions);
};
