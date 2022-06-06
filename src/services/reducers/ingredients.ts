import { IAction, Ingredient } from "../../utils/types";
import {
  REQUEST_INGREDIENTS_FAILED,
  SET_INGREDIENTS,
  SET_INGREDIENTS_SORTED,
} from "../actions/ingredients";

interface Names {
  [key: string]: string;
}

interface ISorted {
  [key: string]: Ingredient[];
}

const initialState = {
  loading: false,
  ingredients: [],
  sortedIngredients: {},
};

function ingredientsReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case SET_INGREDIENTS:
      return { ...state, ingredients: action.ingredientsData, loading: true };

    case SET_INGREDIENTS_SORTED:
      const ingredients = action.ingredientsData || [];
      const ingredientsName: Names = {
        bun: "Булки",
        sauce: "Соусы",
        main: "Начинки",
      };
      // сортировка всех ингредиентов по типу
      const sortedIngredients = ingredients.reduce(
        (object: ISorted, currentItem) => {
          const key = ingredientsName[currentItem.type];
          if (object[key]) {
            object[key] = [...object[key], currentItem];
          } else {
            object[key] = [currentItem];
          }
          return object;
        },
        {}
      );
      return { ...state, sortedIngredients };

    case REQUEST_INGREDIENTS_FAILED:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export default ingredientsReducer;
