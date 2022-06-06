import { IAction, IState } from "../../utils/types";
import { CLOSE_MODAL, OPEN_MODAL_WITH_INGREDIENT } from "../actions/modal";

export const modalReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case OPEN_MODAL_WITH_INGREDIENT:
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpen: true,
          title: action.title,
          ingredientInModal: action.ingredient,
        },
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: { ...state.modal, title: "", ingredientInModal: null },
      };
  }
};
