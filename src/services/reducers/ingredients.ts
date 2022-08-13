import { Ingredient, ISorted, IStateIngredients } from "./../../utils/types";
import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { fetchIngredients } from "./../actions/ingredients";
import { setDrag, setLoading } from "./../actions/ingredients";

interface INames {
  [key: string]: string;
}

export const initialState = {
  loading: false,
  ingredients: [],
  sortedIngredients: {},
  isDrag: false,
};

export const ingredientsSlice = createSlice<IStateIngredients, SliceCaseReducers<IStateIngredients>>({
  name: "ingredients",
  initialState,
  reducers: {
    setDrag,
    setLoading,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      const ingredientsName: INames = {
        bun: "Булки",
        sauce: "Соусы",
        main: "Начинки",
      };
      // сортировка всех ингредиентов по типу
      state.sortedIngredients = action.payload.data.reduce((object: ISorted, currentItem: Ingredient) => {
        const key = ingredientsName[currentItem.type];
        if (object[key]) {
          object[key] = [...object[key], currentItem];
        } else {
          object[key] = [currentItem];
        }
        return object;
      }, {});

      state.ingredients = action.payload.data;
      state.loading = true;
    });
  },
});

export default ingredientsSlice;
