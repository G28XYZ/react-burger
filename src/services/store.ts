import { combineReducers } from "redux";
import ingredientsReducer from "./reducers/ingredients";
import orderReducer from "./reducers/order";
import { modalReducer } from "./reducers/modal";

export const rootReducer = combineReducers({
  ingtedients: ingredientsReducer,
  order: orderReducer,
  modal: modalReducer,
});
