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
import orderSlice from "../../services/reducers/order";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function App() {
  const ingredientsState = useAppSelector((state: RootState) => state.ingredients);
  const orderState = useAppSelector((state: RootState) => state.order);
  const dispatch = useAppDispatch();
  const { loading, ingredients } = ingredientsState;
  const { addBunToOrder, addToOrder } = orderSlice.actions;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  useEffect(() => {
    if (loading) {
      dispatch(
        addBunToOrder(
          ingredients.filter((item: Ingredient) => item.price > 1000 && item.type === "bun")[0]
        )
      );
      dispatch(
        addToOrder(
          ingredients.filter((item: Ingredient) => item.price < 1000 && item.type !== "bun")
        )
      );
      // const ids = ingredients.map((item: Ingredient) => item._id);
      // console.log(ids);
      // dispatch(fetchOrder({ ingredients: ids }));
    }
  }, [loading]);

  useEffect(() => {
    console.log(orderState);
  }, [orderState, orderState.bun._id]);

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
