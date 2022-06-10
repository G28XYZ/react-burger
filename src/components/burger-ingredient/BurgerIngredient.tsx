import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredient.module.css";
import { Ingredient, ISorted } from "../../utils/types";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../services/store";
import modalSlice from "../../services/reducers/modal";
import { useDrag } from "react-dnd";
import { useCallback, useEffect, useState } from "react";
import ingredientsSlice from "../../services/reducers/ingredients";
import orderSlice from "../../services/reducers/order";

export interface IngredientProp {
  ingredient: Ingredient;
}

const BurgerIngredient = ({ ingredient }: IngredientProp) => {
  const state = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const { setDrag } = ingredientsSlice.actions;
  const { orderTotalPrice } = orderSlice.actions;
  const orderList = [...state.order.list, state.order.bun];

  const [count, setCount] = useState(
    orderList.filter((item) => item._id === ingredient._id).length
  );
  const { openModalWithIngredient } = modalSlice.actions;

  function onHandleClick() {
    dispatch(
      openModalWithIngredient({
        title: "Детали ингредиента",
        ingredient: ingredient,
      })
    );
  }

  const checkTotalPrice = () => {
    dispatch(orderTotalPrice());
  };

  const checkCount = useCallback(() => {
    setCount(orderList.filter((item) => item._id === ingredient._id).length);
  }, [ingredient._id, orderList]);

  const [{ opacity, onDrag }, ref] = useDrag({
    type: "ingredient",
    item: ingredient as Ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      onDrag: monitor.isDragging(),
    }),
    end(item) {
      return item;
    },
  });

  useEffect(() => {
    checkTotalPrice();
    checkCount();
    dispatch(setDrag({ onDrag }));
  }, [onDrag, orderList.filter((item) => item._id === ingredient._id).length]);

  return (
    <li
      className={style.item + " pb-10"}
      key={ingredient._id}
      style={{ opacity }}
    >
      {count > 0 && <Counter count={count} size="default" />}
      <img
        ref={ref}
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
};

export default BurgerIngredient;
