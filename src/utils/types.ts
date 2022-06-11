import { ReactNode } from "react";

export interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  shortId?: string;
  constructorId?: number;
  count?: number;
}

export interface ISorted {
  [key: string]: Ingredient[];
}

export interface OpenModalProps {
  title?: string;
  inIngredient?: Ingredient | null;
  inOrder?: boolean;
}
export interface IStoreProviderProps {
  children: ReactNode;
}

export interface IActionIngredients {
  onDrag?: boolean;
}

export interface IStateIngredients {
  loading: boolean;
  ingredients: [] | Ingredient[];
  sortedIngredients: ISorted;
  isDrag: boolean | undefined;
}

export interface IModal {
  orderInModal: boolean;
  ingredientInModal: Ingredient | null;
  title: string;
}

export interface IOrder {
  name: string;
  list: Ingredient[] | [];
  id: string;
  bun: Ingredient | {};
  totalPrice: number;
  replaceIngredient: null | Ingredient;
}

export interface IActionOrder {
  [key: string]: Ingredient | Ingredient[] | null;
}

export interface IActionModal {
  title: string;
  ingredient: Ingredient;
}
