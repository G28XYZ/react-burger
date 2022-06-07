import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModal, IActionModal } from "../../utils/types";

const initialState = {
  title: "",
  orderInModal: false,
  ingredientInModal: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalWithIngredient: (
      state: IModal,
      action: PayloadAction<IActionModal>
    ) => {
      state.title = action.payload.title;
      state.ingredientInModal = action.payload.ingredient;
    },
    openModalWithOrder: (state: IModal) => {
      state.orderInModal = true;
    },
    closeModal: (state: IModal) => {
      state.orderInModal = false;
      state.ingredientInModal = null;
    },
  },
});

export default modalSlice;
