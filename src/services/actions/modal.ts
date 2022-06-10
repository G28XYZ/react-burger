import { PayloadAction } from "@reduxjs/toolkit";
import { IActionModal, IModal } from "../../utils/types";

export const openModalWithIngredient = (
  state: IModal,
  action: PayloadAction<IActionModal>
) => {
  state.title = action.payload.title;
  state.ingredientInModal = action.payload.ingredient;
};

export const openModalWithOrder = (state: IModal) => {
  state.orderInModal = true;
};

export const closeModal = (state: IModal) => {
  state.orderInModal = false;
  state.ingredientInModal = null;
};
