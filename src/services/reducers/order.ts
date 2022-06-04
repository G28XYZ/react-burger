import { IAction, IState } from "../../utils/types";
import { ADD_TO_ORDER } from "../actions/order";

function orderReducer(state: IState, action: IAction) {
  switch (action.type) {
    case ADD_TO_ORDER:
      return { ...state, order: { ...state.order, list: action.orderList } };
    default:
      return state;
  }
}

export default orderReducer;
