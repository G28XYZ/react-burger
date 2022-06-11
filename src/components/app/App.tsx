import { useEffect } from "react";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import appStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { fetchIngredients } from "../../services/actions/ingredients";
// import Preloader from "../Preloader";
import { useAppDispatch, useAppSelector } from "../../services/store";

// по совету наставника временно задана декларация чтобы обойти ошибку TS2322 возникающая на ui элементе Tab
declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

function App() {
  const ingredientsState = useAppSelector((state) => state.ingredients);
  const dispatch = useAppDispatch();
  const { loading } = ingredientsState;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch({ type: "GET_INGREDIENTS" });
    console.log("render app");
  }, [dispatch]);

  return (
    <div className={appStyle.page}>
      <AppHeader />
      {loading && (
        <main className={appStyle.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      )}
    </div>
  );
}

export default App;
