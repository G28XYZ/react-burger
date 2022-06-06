import {
  createContext,
  useReducer,
  useMemo,
  useContext,
  Dispatch,
} from "react";
import ingredientsReducer from "./reducers/ingredients";
import constructorReducer from "./reducers/constructor";
import orderReducer from "./reducers/order";
import { IState, IStoreProviderProps, IAction } from "../utils/types";
import { modalReducer } from "./reducers/modal";

const globalState = {
  loading: false,
  ingredients: [],
  sortedIngredients: {},
  burgerConstructor: [],
  modal: {
    title: "",
    ingredientInModal: null,
    isOpen: false,
  },
  order: {
    name: "",
    list: [],
    bun: {
      _id: "",
      name: "",
      type: "",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "",
      image_mobile: "",
      image_large: "",
      __v: 0,
    },
    id: "",
    totalPrice: 0,
    registerOrder: false,
  },
};

const GlobalContext = createContext<
  IState | IState[] | [IState, Dispatch<IAction>]
>(globalState);

const reducers = (state: IState, action: IAction) => {
  return {
    ...state,
    ...Object.assign(
      state,
      ingredientsReducer(state, action),
      constructorReducer(state, action),
      orderReducer(state, action),
      modalReducer(state, action)
    ),
  };
};

export function StoreProvider({ children }: IStoreProviderProps) {
  const [state, dispatch] = useReducer(reducers, globalState);
  const contextValue = useMemo(
    (): [IState, Dispatch<IAction>] => [state, dispatch],
    [state, dispatch]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useStore(): [IState, Dispatch<IAction>] {
  return useContext<any>(GlobalContext);
}
