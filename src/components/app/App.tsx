import { useLayoutEffect } from "react";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import appStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { getIngredients } from "../../services/actions/ingredients";
import { useStore } from "../../services/StoreProvider";
import Preloader from "../Preloader";

function App() {
  const [state, dispatch] = useStore();
  let { loading } = state;

  useLayoutEffect(() => {
    getIngredients(dispatch);
    console.log("render App");
  }, [dispatch]);

  return (
    <div className={appStyle.page}>
      <AppHeader />
      {loading ? (
        <main className={appStyle.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      ) : (
        <Preloader />
      )}
    </div>
  );
}

export default App;
