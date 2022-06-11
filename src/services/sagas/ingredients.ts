import { takeEvery, all, put } from "redux-saga/effects";
import { address } from "../../utils/constants";
import { Ingredient } from "../../utils/types";
import { ingredientsActions } from "../reducers/ingredients";

function* fetchIngredients() {
  try {
    const { data }: { data: Ingredient[] } = yield fetch(`${address}/ingredients`).then(
      (response) => response.json()
    );
    yield put(ingredientsActions.getIngredients({ ingredients: data }));
  } catch {
    console.log("Error fetch ingredients");
  }
}

function* actionWatcher() {
  yield takeEvery("GET_INGREDIENTS", fetchIngredients);
}

export default function* ingredientSaga() {
  yield all([actionWatcher()]);
}
