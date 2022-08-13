import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ingredientsSlice } from "../ingredients";
import { initialState as ingredientsState } from "../ingredients";
import api from "../../../utils/api";
import { fetchIngredients } from "../../actions/ingredients";

global.fetch = require("jest-fetch-mock");

const { setLoading, setDrag } = ingredientsSlice.actions;

describe("Redux store and actions", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ result: "OK" }),
      ok: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return the initial state", () => {
    expect(ingredientsSlice.reducer(undefined, { type: undefined })).toEqual(ingredientsState);
  });

  test("should get ingredients", () => {
    const middlewares = [thunk.withExtraArgument({ api })];
    const mockStore = configureMockStore(middlewares);

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: "OK" }),
      })
    );

    const expectedActions = { type: "ingredients/fetchIngredients/fulfilled", payload: { result: "OK" } };
    const store = mockStore({ ingredients: [] });

    return store.dispatch(fetchIngredients()).then(() => {
      expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
    });
  });

  test("should return payload: true, on fetch", () => {
    const loading = setLoading({ loading: true });
    expect(ingredientsSlice.reducer(undefined, loading)).toEqual({ ...ingredientsState, loading: true });
  });

  test("should return payload: true, onDrag", () => {
    const onDrag = setDrag({ onDrag: true });
    expect(ingredientsSlice.reducer(undefined, onDrag)).toEqual({ ...ingredientsState, isDrag: true });
  });
});
