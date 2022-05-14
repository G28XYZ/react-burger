import { useCallback, useEffect, useState } from "react";
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

function App() {
  const [load, isLoad] = useState(true);
  const [ingredients, setIngredients] = useState({});
  const [order, setOrder] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, children: <></>, title: "" });

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

  const filterOrder = useCallback((data: Ingredient[]): any => {
    return data.filter((item: Ingredient) => item.price > 1000 || item.price < 100);
  }, []);

  useEffect(() => {
    api.getIngredients().then(({ data }) => {
      setIngredients(sortIngredients(data));
      setOrder(filterOrder(data));
      isLoad(false);
    });
  }, [sortIngredients, filterOrder]);

  function handleCloseModalByEsc(e: KeyboardEvent) {
    if (e.code === "Escape") {
      onCloseModal();
    }
  }

  function onCloseModal(): void {
    setModal({ ...modal, isOpen: false, title: "", children: <></> });
    document.removeEventListener("keydown", handleCloseModalByEsc);
  }

  function onOpenModal({ title, children }: any): void {
    setModal({ ...modal, isOpen: true, title, children });
    document.addEventListener("keydown", handleCloseModalByEsc);
    return;
  }

  return (
    <div className={appStyle.page}>
      <AppHeader />
      {!load && (
        <main className={appStyle.main}>
          <BurgerIngredients
            orderList={order}
            ingredients={ingredients}
            onOpenModal={onOpenModal}
          />
          <BurgerConstructor orderList={order} onOpenModal={onOpenModal} />
          <Modal title={modal.title} isOpen={modal.isOpen} onCloseModal={onCloseModal}>
            {modal.children}
          </Modal>
        </main>
      )}
    </div>
  );
}

export default App;
