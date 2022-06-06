import { IAction, Ingredient, IState } from "../../utils/types";
import {
  ADD_BUN_TO_ORDER,
  ADD_TO_ORDER,
  ORDER_TOTAL_PRICE,
  REGISTER_ORDER,
} from "../actions/order";

function orderReducer(state: IState, action: IAction) {
  switch (action.type) {
    case ADD_TO_ORDER:
      const list = action.orderList || [];
      return {
        ...state,
        order: {
          ...state.order,
          list,
        },
      };

    case ADD_BUN_TO_ORDER:
      return { ...state, order: { ...state.order, bun: action.bun } };

    case ORDER_TOTAL_PRICE:
      const orderList = action.orderList as [];
      const bun = state.order.bun;
      const totalPrice = orderList?.reduce(
        (total: number, item: Ingredient) => total + item.price,
        bun.price * 2
      );
      return {
        ...state,
        order: {
          ...state.order,
          totalPrice,
        },
      };

    case REGISTER_ORDER:
      return {
        ...state,
        order: { ...state.order, registerOrder: action.register },
      };
    default:
      return state;
  }
}

export default orderReducer;
