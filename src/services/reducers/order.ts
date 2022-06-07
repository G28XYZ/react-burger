import { IAction, Ingredient } from "../../utils/types";
import { createSlice } from "@reduxjs/toolkit";

import {
  ADD_BUN_TO_ORDER,
  ADD_TO_ORDER,
  registerOrder,
  ORDER_TOTAL_PRICE,
  REGISTER_ORDER,
} from "../actions/order";

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
  registerOrder: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addBunToOrder: (state, action) => {
      state.bun = action.payload;
    },
    addToOrder: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerOrder.fulfilled, (state, action) => {});
  },
});

function orderReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case ADD_TO_ORDER:
      const list = action.orderList || [];
      return {
        ...state,
        list,
      };

    case ADD_BUN_TO_ORDER:
      return { ...state, bun: action.bun };

    case ORDER_TOTAL_PRICE:
      const orderList = action.orderList as [];
      const bun = state.bun;
      const totalPrice = orderList?.reduce(
        (total: number, item: Ingredient) => total + item.price,
        bun.price * 2
      );
      return {
        ...state,
        totalPrice,
      };

    case REGISTER_ORDER:
      return {
        ...state,
        registerOrder: action.register,
        name: action.name,
        id: action.id,
      };
    default:
      return state;
  }
}

export default orderSlice;
