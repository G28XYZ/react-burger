import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { initialBun } from "../../utils/constants";
import { Ingredient, IStateOrder, TCeseReducerOrder } from "../../utils/types";
const shortId = require("shortid");

export const onRegisterOrder = createAsyncThunk(
  "order/onRegisterOrder",
  async ({ ingredients, token }: { ingredients: string[]; token: string }) => {
    const response = await api.getOrder(ingredients, token);
    if (response.success) {
      return response;
    } else {
      console.log(response);
      return false;
    }
  }
);

export const deleteInOrder: TCeseReducerOrder = (state, action) => {
  const deletedItem = action.payload.deletedItem as Ingredient;
  state.list = state.list.filter((item: Ingredient) => item.shortId !== deletedItem.shortId);
};

export const addBunToOrder: TCeseReducerOrder = (state, action) => {
  state.bun = action.payload.ingredient as Ingredient;
};

export const addToOrder: TCeseReducerOrder = (state, action) => {
  const ingredient = Object.assign({ shortId: shortId.generate() }, action.payload.ingredient);
  const replaceItem = action.payload.replaceIngredient;
  let newList = [...state.list];
  if (replaceItem) {
    const replaceIndex = newList.findIndex((item: Ingredient) => replaceItem.shortId === item.shortId);
    newList.splice(replaceIndex, 1, ingredient as Ingredient);
    state.list = newList;
    state.replaceIngredient = null;
  } else {
    state.list.push(ingredient as never);
  }
};

export const orderTotalPrice = (state: IStateOrder) => {
  const orderList = state.list as [];
  const bun = state.bun;
  state.totalPrice = orderList.reduce((total: number, item: Ingredient) => total + item.price, bun.price * 2);
};

export const setDragged: TCeseReducerOrder = (state, action) => {
  state.replaceIngredient = action.payload.ingredient as Ingredient | null;
};

export const moveIngredient: TCeseReducerOrder = (state, action) => {
  let from = Object.assign(action.payload.from as Ingredient);
  let to = Object.assign(action.payload.to as Ingredient);
  let newList = [...state.list];
  const toIndex = newList.findIndex((item: Ingredient) => to.shortId === item.shortId);
  const fromIndex = newList.findIndex((item: Ingredient) => from.shortId === item.shortId);
  [newList[toIndex], newList[fromIndex]] = [newList[fromIndex], newList[toIndex]];
  state.list = newList;
};

export const resetOrder = (state: IStateOrder) => {
  state.list = [];
  state.bun = initialBun;
  state.id = "";
};
