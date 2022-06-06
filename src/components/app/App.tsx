import { TypedUseSelectorHook } from "react-redux";
import { Dispatch, useEffect, useLayoutEffect } from "react";
import AppHeader from "../app-header/AppHeader";
// import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import appStyle from "./app.module.css";
// import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { fetchIngredients } from "../../services/actions/ingredients";
import Preloader from "../Preloader";
import { useDispatch, useSelector } from "react-redux";
import { IAction, Ingredient } from "../../utils/types";
import { AnyAction } from "redux";
import type { AppDispatch, RootState } from "../../services/store";
import orderSlice, { addBunToOrder } from "../../services/reducers/order";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function App() {
  const ingredientsState = useAppSelector((state: RootState) => state.ingredients);
  const dispatch = useAppDispatch();
  const { loading } = ingredientsState;
  const { addBunToOrder } = orderSlice.actions;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(addBunToOrder(1));
  }, []);

  useEffect(() => {
    if (loading) {
      console.log(ingredientsState);
      // const ids = ingredients.map((item: Ingredient) => item._id);
      // console.log(ids);
      // dispatch(fetchOrder({ ingredients: ids }));
    }
  }, [loading]);

  return (
    <div>
      <div></div>
    </div>
  );

  // return (
  //   <div className={appStyle.page}>
  //     <AppHeader />
  //     {/* {loading ? (
  //       <main className={appStyle.main}>
  //         <BurgerIngredients />
  //         <BurgerConstructor />
  //       </main>
  //     ) : (
  //       <Preloader />
  //     )} */}
  //   </div>
  // );
}

export default App;
