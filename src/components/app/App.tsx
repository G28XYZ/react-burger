import { useCallback, useEffect, useMemo, useState } from "react";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import appStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import api from "../../utils/api";
import { Ingredient } from "../burger-ingredient/BurgerIngredient";
import Modal from "../modal/Modal";

interface Names {
  [key: string]: string;
}

export interface OpenModalProps {
  title: string;
  children: any;
}

// interface IIngredients {}

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
  const [modal, setModal] = useState({ isOpen: false, children: <></>, title: "" });

  const sortIngredients = useCallback((data: Ingredient[]): ISorted => {
    const ingredientsName: Names = {
      bun: "Булки",
      sauce: "Соусы",
      main: "Начинки",
    };

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
    return data.filter((item: Ingredient) => item.price > 1000 || item.price < 100);
  };

  useEffect(() => {
    api
      .getIngredients()
      .then(({ data }) => {
        setIngredients(sortIngredients(data));
        setOrder({ ...order, list: filterOrder(data) });
        isLoad(false);
      })
      .catch(console.log);
    console.log("render App");
  }, []);

  function onCloseModal(): void {
    setModal({ ...modal, isOpen: false, title: "", children: <></> });
  }

  function onOpenModal({ title = "", children }: OpenModalProps): void {
    setModal({ ...modal, isOpen: true, title, children });
  }

  return (
    <div className={appStyle.page}>
      <AppHeader />
      {!load && (
        <main className={appStyle.main}>
          <BurgerIngredients
            orderList={order.list}
            ingredients={ingredients}
            onOpenModal={onOpenModal}
          />
          <BurgerConstructor order={order} onOpenModal={onOpenModal} />
          <Modal title={modal.title} isOpen={modal.isOpen} onCloseModal={onCloseModal}>
            {modal.children}
          </Modal>
        </main>
      )}
    </div>
  );
}

export default App;
