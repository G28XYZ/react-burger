import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { orderSlice } from "../order";
import { initialState as orderState } from "../order";
import api from "../../../utils/api";
import { onRegisterOrder } from "../../actions/order";
import { initialBun } from "../../../utils/constants";

global.fetch = require("jest-fetch-mock");

const { deleteInOrder, addToOrder, addBunToOrder, orderTotalPrice, setDragged, resetOrder } = orderSlice.actions;

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
    expect(orderSlice.reducer(undefined, { type: undefined })).toEqual(orderState);
  });

  test("should post order", () => {
    const middlewares = [thunk.withExtraArgument({ api })];
    const mockStore = configureMockStore(middlewares);

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: "OK" }),
      })
    );

    const expectedActions = { type: "order/onRegisterOrder/fulfilled", payload: { result: "OK" } };
    const store = mockStore(orderState);

    return store.dispatch(onRegisterOrder([initialBun])).then(() => {
      expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
    });
  });

  test("should add ingredient to order", () => {
    const add = addToOrder({ ingredient: initialBun });
    expect(orderSlice.reducer(undefined, add).list.length).toEqual(1);
  });

  test("should delete ingredient from order list", () => {
    const deleteItem = deleteInOrder({ deletedItem: initialBun });
    expect(orderSlice.reducer({ ...orderState, list: [initialBun] }, deleteItem)).toEqual(orderState);
  });

  test("should add bun to order", () => {
    const addBun = addBunToOrder({ ingredient: initialBun });
    expect(orderSlice.reducer(undefined, addBun).bun).toEqual(initialBun);
  });

  test("should set total price", () => {
    const addIngredient = addToOrder({ ingredient: { ...initialBun, price: 100 } });
    const state = orderSlice.reducer(undefined, addIngredient);
    const price = orderTotalPrice();
    expect(orderSlice.reducer(state, price).totalPrice).toEqual(100);
  });

  test("should reset ingredient", () => {
    const addIngredient = addToOrder({ ingredient: { ...initialBun, price: 100 } });
    const state = orderSlice.reducer(undefined, addIngredient);
    const reset = resetOrder();
    expect(orderSlice.reducer(state, reset)).toEqual(orderState);
  });

  test("should set drag ingredient", () => {
    const drag = setDragged({ ingredient: initialBun });
    expect(orderSlice.reducer(undefined, drag).replaceIngredient).toEqual(initialBun);
  });
});
