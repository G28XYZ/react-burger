import { Dispatch } from "react";
import api from "../../utils/api";
import { IAction, Ingredient } from "../../utils/types";
import { ADD_TO_ORDER } from "./order";

export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const SET_INGREDIENTS_SORTED = "SET_INGREDIENTS_SORTED";
export const REQUEST_INGREDIENTS_FAILED = "REQUEST_INGREDIENTS_FAILED";

export const getIngredients = (dispatch: Dispatch<IAction>) => {
  return api
    .getIngredients()
    .then(({ data }) => {
      dispatch({ type: SET_INGREDIENTS, ingredientsData: data });
      dispatch({ type: SET_INGREDIENTS_SORTED, ingredientsData: data });
      return true;
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: REQUEST_INGREDIENTS_FAILED });
      return false;
    });
};
