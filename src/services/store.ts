import { combineReducers } from "redux";
import ingredientsReducer from "./reducers/ingredients";
import orderReducer, { orderSlice } from "./reducers/order";
import { modalReducer } from "./reducers/modal";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ingredientsSlice } from "./reducers/ingredients";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    order: orderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
