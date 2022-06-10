import { createSlice } from "@reduxjs/toolkit";
import {
  openModalWithIngredient,
  openModalWithOrder,
  closeModal,
} from "../actions/modal";

const initialState = {
  title: "",
  orderInModal: false,
  ingredientInModal: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalWithIngredient,
    openModalWithOrder,
    closeModal,
  },
});

export default modalSlice;
