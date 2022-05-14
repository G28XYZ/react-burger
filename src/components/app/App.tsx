import { useCallback, useEffect, useState } from "react";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import appStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import api from "../../utils/api";
import { Ingredient } from "../burger-ingredient/BurgerIngredient";

interface Names {
  [key: string]: string;
}

function App() {
  const [load, isLoad] = useState(true);
  const [ingredients, setIngredients] = useState({});
  const [order, setOrder] = useState([]);

  const sortIngredients = useCallback((data: Ingredient[]): { Names: Ingredient } => {
    const ingredientsName: Names = {
      bun: "Булки",
      sauce: "Соусы",
      main: "Начинки",
    };

    const sortedIngredients = data.reduce((p: any, c) => {
      p[ingredientsName[c.type]] = p[ingredientsName[c.type]]
        ? [...p[ingredientsName[c.type]], c]
        : [c];
      return p;
    }, {});
    return sortedIngredients;
  }, []);

  useEffect(() => {
    api.getIngredients().then(({ data }) => {
      setIngredients(sortIngredients(data));
      setOrder(data.filter((item: Ingredient) => item.price > 1000 || item.price < 100));
      isLoad(false);
    });
  }, [sortIngredients]);

  return (
    <div className={appStyle.page}>
      <AppHeader />
      {!load && (
        <main className={appStyle.main}>
          <BurgerIngredients orderList={order} ingredients={ingredients} />
          <BurgerConstructor orderList={order} />
        </main>
      )}
    </div>
  );
}

export default App;
