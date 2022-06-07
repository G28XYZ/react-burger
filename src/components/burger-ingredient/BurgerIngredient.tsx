import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredient.module.css";
import { Ingredient } from "../../utils/types";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../services/store";
import modalSlice from "../../services/reducers/modal";

export interface IngredientProp {
  ingredient: Ingredient;
}

function BurgerIngredient({ ingredient }: IngredientProp) {
  const state = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const orderList = [...state.order.list, state.order.bun];
  const { openModalWithIngredient } = modalSlice.actions;

  function onHandleClick() {
    dispatch(
      openModalWithIngredient({
        title: "Детали ингредиента",
        ingredient: ingredient,
      })
    );
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
      <p
        className="text text_type_main-default"
        style={{ textAlign: "center" }}
      >
        {ingredient.name}
      </p>
    </li>
  );
}

export default BurgerIngredient;
