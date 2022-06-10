import { createSlice } from "@reduxjs/toolkit";
import { onRegisterOrder } from "../actions/order";
import {
  addBunToOrder,
  addToOrder,
  deleteInOrder,
  orderTotalPrice,
  setDragged,
  moveIngredient,
} from "../actions/order";
import defaultImage from "../../images/transparency.png";

const initialState = {
  name: "",
  list: [],
  bun: {
    _id: "",
    name: "Переместите сюда булку",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: defaultImage,
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
    addBunToOrder,
    addToOrder,
    deleteInOrder,
    orderTotalPrice,
    setDragged,
    moveIngredient,
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
