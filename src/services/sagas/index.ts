import { all } from "redux-saga/effects";
import { ingredientsWatcher } from "./ingredients";
import { orderWatcher } from "./order";

export default function* rootSaga() {
  yield all([...orderWatcher, ...ingredientsWatcher]);
}
