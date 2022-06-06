import { IAction } from "../../utils/types";
import { CLOSE_MODAL, OPEN_MODAL_WITH_INGREDIENT } from "../actions/modal";

const initialState = {
  title: "",
  ingredientInModal: null,
  isOpen: false,
};

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
