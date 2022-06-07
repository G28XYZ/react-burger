import { Dispatch } from "react";
import api from "../../utils/api";
import { IAction } from "../../utils/types";

export const ADD_TO_ORDER = "ADD_TO_ORDER";
export const ADD_BUN_TO_ORDER = "ADD_BUN_TO_ORDER";
export const ORDER_TOTAL_PRICE = "ORDER_TOTAL_PRICE";
export const REGISTER_ORDER = "REGISTER_ORDER";

export function onRegisterOrder(
  dispatch: Dispatch<IAction>,
  ingredients: { ingredients: string[] }
) {
  return api
    .getOrder(ingredients)
    .then(({ success, name, order }) => {
      if (success) {
        dispatch({
          type: REGISTER_ORDER,
          register: success,
          id: order.number,
          name,
        });
      } else {
        dispatch({
          type: REGISTER_ORDER,
          register: false,
          id: 0,
        });
      }
    })
    .catch(console.log);
}
