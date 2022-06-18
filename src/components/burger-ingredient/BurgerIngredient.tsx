import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredient.module.css";
import { Ingredient } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../services/store";
import modalSlice from "../../services/reducers/modal";
import { useDrag } from "react-dnd";
import { useCallback, useEffect, useState } from "react";
import orderSlice from "../../services/reducers/order";
import { Link, useLocation } from "react-router-dom";

export interface IngredientProp {
  ingredient: Ingredient;
}

const BurgerIngredient = ({ ingredient }: IngredientProp) => {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { orderTotalPrice } = orderSlice.actions;

  const orderList = Array.from([...state.order.list, state.order.bun]);

  const [count, setCount] = useState(
    orderList.filter((item) => item._id === ingredient._id).length
  );
  const { openModalWithIngredient } = modalSlice.actions;

  function onHandleClick() {
    dispatch(
      openModalWithIngredient({
        title: "Детали ингредиента",
        ingredient,
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
  }, [orderList.filter((item) => item._id === ingredient._id).length]);

  return (
    <li className={style.item + " pb-10"} key={ingredient._id} style={{ opacity }}>
      {count > 0 && <Counter count={count} size="default" />}
      <Link to={`/ingredient/${ingredient._id}`} state={{ backgroundLocation: location }}>
        <img
          ref={ref}
          className={style.image}
          src={ingredient.image}
          alt={ingredient.name}
          onClick={onHandleClick}
        />
      </Link>
      <div className="text text_type_digits-default">
        {ingredient.price} <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default" style={{ textAlign: "center" }}>
        {ingredient.name}
      </p>
    </li>
  );
};

export default BurgerIngredient;
