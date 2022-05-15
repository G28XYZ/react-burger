import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-modal/IngredientDetails";
import style from "./burger-ingredient.module.css";
import { OpenModalProps } from "../app/App";

export interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface ingredientProp {
  ingredient: Ingredient;
  orderList: Ingredient[] | {}[];
  onOpenModal: ({}: any) => void;
}

function BurgerIngredient({ ingredient, orderList, onOpenModal }: ingredientProp) {
  function onHandleClick() {
    onOpenModal({
      title: "Детали ингредиента",
      inIngredient: ingredient,
    });
  }

  return (
    <li className={style.item + " pb-10"} key={ingredient._id}>
      {orderList.includes(ingredient) && <Counter count={1} size="default" />}
      <img
        className={style.image}
        src={ingredient.image}
        alt={ingredient.name}
        onClick={onHandleClick}
      />
      <div className="text text_type_digits-default">
        {ingredient.price} <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default" style={{ textAlign: "center" }}>
        {ingredient.name}
      </p>
    </li>
  );
}

export default BurgerIngredient;
