import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import style from "../app/app.module.css";

function Main() {
  return (
    <main className={style.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

export default Main;
