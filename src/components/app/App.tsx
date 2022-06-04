import { useEffect, useState } from "react";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import appStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { getIngredients } from "../../services/actions/ingredients";
import { useStore } from "../../services/StoreProvider";
import { OpenModalProps } from "../../utils/types";
import Preloader from "../Preloader";

function App() {
  const [state, dispatch] = useStore();
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState<OpenModalProps>({
    title: "",
    inIngredient: null,
    inOrder: false,
  });

  useEffect(() => {
    getIngredients(dispatch).then((success: any) => {
      setTimeout(() => {
        setLoading(success);
      }, 1000);
      return;
    });
    console.log("render App");
  }, [dispatch, loading, state]);

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
