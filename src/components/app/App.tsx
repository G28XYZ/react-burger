import { Dispatch, useLayoutEffect } from "react";
import AppHeader from "../app-header/AppHeader";
// import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import appStyle from "./app.module.css";
// import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { getIngredients } from "../../services/actions/ingredients";
import Preloader from "../Preloader";
import { useDispatch, useSelector } from "react-redux";
import { IAction } from "../../utils/types";
import { AnyAction } from "redux";

function App() {
  const [state, dispatch] = [useSelector((state) => state), useDispatch()];
  // let { loading, sortedIngredients, ingredients, order } = state;

  useLayoutEffect(() => {
    dispatch<any>(getIngredients());
    console.log(state);
    console.log("render App");
  }, []);

  return (
    <div className={appStyle.page}>
      <AppHeader />
      {/* {loading ? (
        <main className={appStyle.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      ) : (
        <Preloader />
      )} */}
    </div>
  );
}

export default App;
