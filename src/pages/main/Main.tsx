import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import style from "../../components/app/app.module.css";
import { useAppSelector } from "../../services/store";

function Main() {
  const { loading } = useAppSelector((state) => state.ingredients);

  return (
    <main className={style.main}>
      {loading && <BurgerIngredients />}
      <BurgerConstructor />
    </main>
  );
}

export default Main;
