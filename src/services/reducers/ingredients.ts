import { IAction, Ingredient, IState } from "../../utils/types";
import { SET_INGREDIENTS, SET_INGREDIENTS_SORTED } from "../actions/ingredients";

interface Names {
  [key: string]: string;
}

interface ISorted {
  [key: string]: Ingredient[];
}

function ingredientsReducer(state: IState, action: IAction) {
  switch (action.type) {
    case SET_INGREDIENTS:
      return { ...state, ingredients: action.ingredientsData };

    case SET_INGREDIENTS_SORTED:
      const ingredients = action.ingredientsData || [];
      const ingredientsName: Names = {
        bun: "Булки",
        sauce: "Соусы",
        main: "Начинки",
      };
      // сортировка всех ингредиентов по типу
      const sortedIngredients = ingredients.reduce((object: ISorted, currentItem) => {
        const key = ingredientsName[currentItem.type];
        if (object[key]) {
          object[key] = [...object[key], currentItem];
        } else {
          object[key] = [currentItem];
        }
        return object;
      }, {});
      return { ...state, sortedIngredients };

    default:
      return state;
  }
}

export default ingredientsReducer;
