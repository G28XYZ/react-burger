import { Ingredient, ISorted, IStateIngredients } from "../../utils/types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "../actions/ingredients";
import { setDrag } from "../actions/ingredients";

interface INames {
  [key: string]: string;
}

const initialState = {
  loading: false,
  ingredients: [],
  sortedIngredients: {},
  isDrag: false,
} as IStateIngredients;

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setDrag,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      const ingredientsName: INames = {
        bun: "Булки",
        sauce: "Соусы",
        main: "Начинки",
      };
      // сортировка всех ингредиентов по типу
      state.sortedIngredients = action.payload.reduce((object: ISorted, currentItem: Ingredient) => {
        const key = ingredientsName[currentItem.type];
        if (object[key]) {
          object[key] = [...object[key], currentItem];
        } else {
          object[key] = [currentItem];
        }
        return object;
      }, {});

      state.ingredients = action.payload;
      state.loading = true;
    });
  },
});

export default ingredientsSlice;
