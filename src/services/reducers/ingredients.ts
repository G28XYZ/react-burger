import { IAction, IState } from "../../utils/types";
import { INGREDIENT_CLICK } from "../actions/ingredients";

function ingredientsReducer(state: IState, action: IAction) {
  switch (action.type) {
    case INGREDIENT_CLICK:
      return { ...state, ingredients: action.name };
    default:
      return state;
  }
}

export default ingredientsReducer;
