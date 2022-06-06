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
}

export interface OpenModalProps {
  title?: string;
  inIngredient?: Ingredient | null;
  inOrder?: boolean;
}
export interface IState {
  loading: boolean;
  ingredients: Ingredient[];
  sortedIngredients: { [key: string]: Ingredient[] };
  burgerConstructor: Ingredient[];
  modal: { isOpen: boolean; ingredientInModal: Ingredient | null; title: string };
  order: {
    list: Ingredient[] | {}[];
    id: string;
    bun: Ingredient;
    totalPrice: number;
  };
}

export interface IStoreProviderProps {
  children: ReactNode;
}

export interface IAction {
  type: string;
  name?: string;
  title?: string;
  ingredient?: Ingredient;
  ingredientsData?: Ingredient[];
  orderList?: Ingredient[] | [];
  data?: Ingredient | [];
  bun?: Ingredient;
}
