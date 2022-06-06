import { Ingredient } from "../../utils/types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "../actions/ingredients";

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

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      const ingredientsName: Names = {
        bun: "Булки",
        sauce: "Соусы",
        main: "Начинки",
      };
      // сортировка всех ингредиентов по типу
      state.sortedIngredients = action.payload.reduce(
        (object: ISorted, currentItem: Ingredient) => {
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

      state.ingredients = action.payload;
      state.loading = true;
    });
  },
});

export default ingredientsSlice;
