import {
  createContext,
  useReducer,
  useMemo,
  useContext,
  Dispatch,
  ContextType,
  Context,
} from "react";
import ingredientsReducer from "./reducers/ingredients";
import constructorReducer from "./reducers/constructor";
import { IState, IStoreProviderProps, IAction } from "../utils/types";

const globalState = {
  ingredients: "",
  burgerConstructor: "",
};

const GlobalContext = createContext<IState | IState[] | [IState, Dispatch<IAction>]>(globalState);

const reducers = (state: IState, action: IAction) => {
  return {
    ...state,
    ...[ingredientsReducer, constructorReducer].reduce(
      (objState, reducer) => ({ ...objState, ...reducer(objState, action) }),
      state
    ),
  };
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
