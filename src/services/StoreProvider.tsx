import { createContext, useReducer, useMemo, useContext, Dispatch } from "react";
import ingredientsReducer from "./reducers/ingredients";
import constructorReducer from "./reducers/constructor";
import orderReducer from "./reducers/order";
import { IState, IStoreProviderProps, IAction } from "../utils/types";

const globalState = {
  ingredients: [],
  sortedIngredients: {},
  burgerConstructor: [],
  order: {
    list: [{}],
    id: "123",
  },
};

const GlobalContext = createContext<IState | IState[] | [IState, Dispatch<IAction>]>(globalState);

const reducers = (state: IState, action: IAction) => {
  return Object.assign(
    state,
    ingredientsReducer(state, action),
    constructorReducer(state, action),
    orderReducer(state, action)
  );
};

export function StoreProvider({ children }: IStoreProviderProps) {
  const [state, dispatch] = useReducer(reducers, globalState);
  const contextValue = useMemo(
    (): [IState, Dispatch<IAction>] => [state, dispatch],
    [state, dispatch]
  );

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
}

export function useStore(): [IState, Dispatch<IAction>] {
  return useContext<any>(GlobalContext);
}
