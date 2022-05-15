import { useCallback, useEffect, useState } from "react";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import appStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import api from "../../utils/api";
import { Ingredient, OpenModalProps } from "../../utils/types";

interface Names {
  [key: string]: string;
}

interface ISorted {
  [key: string]: Ingredient[];
}

function App() {
  const [load, isLoad] = useState(true);
  const [ingredients, setIngredients] = useState({});
  const [order, setOrder] = useState({
    list: [{}],
    id: "034536",
  });
  const [modal, setModal] = useState<OpenModalProps>({
    title: "",
    inIngredient: null,
    inOrder: false,
  });

  const sortIngredients = useCallback((data: Ingredient[]): ISorted => {
    const ingredientsName: Names = {
      bun: "Булки",
      sauce: "Соусы",
      main: "Начинки",
    };

    // сортировка всех ингредиентов по типу
    const sortedIngredients = data.reduce((object: ISorted, currentItem) => {
      const key = ingredientsName[currentItem.type];
      if (object[key]) {
        object[key] = [...object[key], currentItem];
      } else {
        object[key] = [currentItem];
      }
      return object;
    }, {});
    return sortedIngredients;
  }, []);

  const filterOrder = (data: Ingredient[]): Ingredient[] => {
    // фильтрует элементы для условного формирования заказа
    return data.filter((item: Ingredient) => item.price > 1000 || item.price < 100);
  };

  useEffect(() => {
    if (load) {
      api
        .getIngredients()
        .then(({ data }) => {
          isLoad(false);
          setIngredients(sortIngredients(data));
          setOrder({ ...order, list: filterOrder(data) });
        })
        .catch(console.log);
      console.log("render App");
    }
  }, [load, order, sortIngredients]);

  function onCloseModal(): void {
    setModal({ ...modal, title: "", inIngredient: null, inOrder: false });
  }

  function onOpenModal({ title = "", inIngredient = null, inOrder = false }: OpenModalProps): void {
    setModal({ ...modal, title, inIngredient, inOrder });
  }

  return (
    <div className={appStyle.page}>
      <AppHeader />
      {!load && (
        <main className={appStyle.main}>
          <BurgerIngredients
            orderList={order.list}
            ingredients={ingredients}
            onCloseModal={onCloseModal}
            onOpenModal={onOpenModal}
            ingredientInModal={modal.inIngredient}
          />
          <BurgerConstructor
            order={order}
            onOpenModal={onOpenModal}
            onCloseModal={onCloseModal}
            inOrder={modal.inOrder}
          />
        </main>
      )}
    </div>
  );
}

export default App;
