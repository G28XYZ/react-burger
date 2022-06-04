import { Dispatch } from "react";
import api from "../../utils/api";
import { IAction, Ingredient } from "../../utils/types";
import { ADD_TO_ORDER } from "./order";

export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const SET_INGREDIENTS_SORTED = "SET_INGREDIENTS_SORTED";

export const getIngredients = (dispatch: Dispatch<IAction>) => {
  return api
    .getIngredients()
    .then(({ data }) => {
      dispatch({ type: SET_INGREDIENTS, ingredientsData: data });
      dispatch({ type: SET_INGREDIENTS_SORTED, ingredientsData: data });
      dispatch({
        type: ADD_TO_ORDER,
        orderList: data.filter((item: Ingredient) => item.price > 1000 || item.price < 100),
      });
      return true;
      // setLoading(true);
      // setIngredients(sortIngredients(data));
      // setOrder({ ...order, list: filterOrder(data) });
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
