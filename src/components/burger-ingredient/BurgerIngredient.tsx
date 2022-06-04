import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredient.module.css";
import { Ingredient } from "../../utils/types";
import { OpenModalProps } from "../../utils/types";
import { useStore } from "../../services/StoreProvider";

export interface IngredientProp {
  ingredient: Ingredient;
  onOpenModal: ({ title, inIngredient, inOrder }: OpenModalProps) => void;
}

function BurgerIngredient({ ingredient, onOpenModal }: IngredientProp) {
  const [state] = useStore();
  const orderList = state.order.list;
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
