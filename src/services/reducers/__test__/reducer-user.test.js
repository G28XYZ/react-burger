import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { userSlice } from "../user";
import { initialState as userState } from "../user";
import auth from "../../../utils/auth";
import { onLogin } from "../../actions/user";

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
    expect(userSlice.reducer(undefined, { type: undefined })).toEqual(userState);
  });

  test("should post order", async () => {
    const middlewares = [thunk.withExtraArgument({ auth })];
    const mockStore = configureMockStore(middlewares);

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: "OK" }),
      })
    );

    const expectedActions = { type: "user/onLogin/fulfilled", payload: { result: "OK" } };
    const store = mockStore(userState);

    const result = await store.dispatch(onLogin({ email: "email", password: "password" }));
    expect(store.getActions()[1]).toEqual({ ...expectedActions, ...result });
  });
});
