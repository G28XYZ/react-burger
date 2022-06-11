import { takeEvery, put, ForkEffect } from "redux-saga/effects";
import { ORDER_ACTIONS } from "../actions/order";
import { orderActions } from "../reducers/order";

function* setCount() {
  console.log(1);
  yield put(orderActions.resetOrder);
}

export const orderWatcher: ForkEffect[] = [takeEvery(ORDER_ACTIONS.SET_COUNT, setCount)];
