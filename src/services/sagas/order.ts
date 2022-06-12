import { takeEvery, put, ForkEffect } from "redux-saga/effects";
import { ORDER_ACTIONS } from "../actions/order";
import { orderActions } from "../reducers/order";

function* setCount({ count }: { type: string; count: any }) {
  yield put(orderActions.setCountIngredient({ count }));
}

export const orderWatcher: ForkEffect[] = [takeEvery(ORDER_ACTIONS.SET_COUNT, setCount)];
