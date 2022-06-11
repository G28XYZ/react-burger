import { takeEvery, put, ForkEffect } from "redux-saga/effects";
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

export const ingredientsWatcher: ForkEffect[] = [takeEvery("GET_INGREDIENTS", fetchIngredients)];
