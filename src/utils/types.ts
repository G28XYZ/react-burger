import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode, RefObject } from "react";

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

export type TRefsElement = Array<RefObject<HTMLDivElement>>;

export interface IngredientProp {
  ingredient: Ingredient;
}

export type DragObject = unknown;
export type DropResult = unknown;
export type CollectedProps = {
  onDrag?: boolean;
  opacity?: number;
  isHover?: boolean;
  handlerId?: string;
};

export interface IModalProps {
  children: ReactNode;
  onCloseModal: () => void;
}

export type TCallbackModalCloseByEsc = (e: KeyboardEvent) => void;

export interface IFetchOrderItem {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IFetchOrdersData {
  orders: IFetchOrderItem[] | [];
  success: boolean;
  total: number;
  totalToday: number;
}

// Actions

export type IActionIngredients = {
  onDrag?: boolean;
  request?: boolean;
};

export interface IActionOrder {
  to?: Ingredient;
  from?: Ingredient;
  ingredient?: Ingredient | null;
  replaceIngredient?: Ingredient | null;
  deletedItem?: Ingredient;
}

export interface IActionModal {
  title: string;
  ingredient: Ingredient;
}

// StateInterfaces

export interface IStateOrder {
  name: string;
  list: Ingredient[] | [];
  id: string;
  bun: Ingredient;
  totalPrice: number;
  replaceIngredient: null | Ingredient;
}
export interface IStateIngredients {
  loading: boolean;
  ingredients: [] | ReadonlyArray<Ingredient>;
  sortedIngredients: ISorted;
  isDrag: boolean | undefined;
}

export interface IStateUser {
  name: string;
  email: string;
  loggedIn: boolean;
}

export interface IStateFeed {
  ownerOrderFeedData: IFetchOrdersData;
  allOrderFeedData: IFetchOrdersData;
}

export interface IStateModal {
  orderInModal: boolean;
  ingredientInModal: Ingredient | null;
  title: string;
}

// CaseReducers
export type TCaseReducerFeed = CaseReducer<IStateFeed, PayloadAction<{ data: IFetchOrdersData }>>;
export type TCaseReducerIngredients = CaseReducer<IStateIngredients, PayloadAction<IActionIngredients>>;
export type TCeseReducerOrder = CaseReducer<IStateOrder, PayloadAction<IActionOrder>>;
