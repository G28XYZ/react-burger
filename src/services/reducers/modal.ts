import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAction, IModal } from "../../utils/types";
import { CLOSE_MODAL, OPEN_MODAL_WITH_INGREDIENT } from "../actions/modal";

const initialState = {
  title: "",
  orderInModal: false,
  ingredientInModal: null,
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalWithIngredient: (state: IModal, action: PayloadAction<any>) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.ingredientInModal = action.payload.ingredient;
    },
    openModalWithOrder: (state: IModal, action: PayloadAction<any>) => {
      state.isOpen = true;
      state.orderInModal = true;
    },
    closeModal: (state: IModal) => {
      state.orderInModal = false;
      state.ingredientInModal = null;
    },
  },
});

export default modalSlice;

export const modalReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case OPEN_MODAL_WITH_INGREDIENT:
      return {
        ...state,
        isOpen: true,
        title: action.title,
        ingredientInModal: action.ingredient,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        title: "",
        ingredientInModal: null,
      };
    default:
      return state;
  }
};
