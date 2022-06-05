import { useEffect, useState } from "react";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import appStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { getIngredients } from "../../services/actions/ingredients";
import { useStore } from "../../services/StoreProvider";
import { Ingredient, OpenModalProps } from "../../utils/types";
import Preloader from "../Preloader";
import { ADD_TO_ORDER, ADD_BUN_TO_ORDER } from "../../services/actions/order";

function App() {
  const [state, dispatch] = useStore();
  const { loading, sortedIngredients, ingredients, order } = state;

  const [modal, setModal] = useState<OpenModalProps>({
    title: "",
    inIngredient: null,
    inOrder: false,
  });

  useEffect(() => {
    setTimeout(() => {
      getIngredients(dispatch);
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      dispatch({
        type: ADD_TO_ORDER,
        orderList: ingredients.filter(
          (item: Ingredient) => item.price < 1000 && item.type !== "bun"
        ),
      });
      dispatch({
        type: ADD_BUN_TO_ORDER,
        bun: ingredients.filter((item: Ingredient) => item.price > 1000 && item.type === "bun")[0],
      });
      console.log("render App");
      console.log(state);
    }
  }, [loading]);

  function onCloseModal(): void {
    setModal({ ...modal, title: "", inIngredient: null, inOrder: false });
  }

  function onOpenModal({ title = "", inIngredient = null, inOrder = false }: OpenModalProps): void {
    setModal({ ...modal, title, inIngredient, inOrder });
  }

  return (
    <div className={appStyle.page}>
      <AppHeader />
      {loading ? (
        <main className={appStyle.main}>
          <BurgerIngredients
            onCloseModal={onCloseModal}
            onOpenModal={onOpenModal}
            ingredientInModal={modal.inIngredient}
          />
          <BurgerConstructor
            onOpenModal={onOpenModal}
            onCloseModal={onCloseModal}
            inOrder={modal.inOrder}
          />
        </main>
      ) : (
        <Preloader />
      )}
    </div>
  );
}

export default App;
