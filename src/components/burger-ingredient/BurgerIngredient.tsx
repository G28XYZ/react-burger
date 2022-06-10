import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredient.module.css";
import { Ingredient } from "../../utils/types";
import { RootState, useAppDispatch, useAppSelector } from "../../services/store";
import modalSlice from "../../services/reducers/modal";
import { useDrag } from "react-dnd";
import { useCallback, useEffect, useState } from "react";
import ingredientsSlice from "../../services/reducers/ingredients";
import { throttle } from "../../utils/constants";

export interface IngredientProp {
  ingredient: Ingredient;
}

const BurgerIngredient = ({ ingredient }: IngredientProp) => {
  const state = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const { isDrag } = state.ingredients;
  const { setDrag } = ingredientsSlice.actions;
  const orderList = [...state.order.list, state.order.bun];

  const [count, setCount] = useState(0);

  const { openModalWithIngredient } = modalSlice.actions;

  function onHandleClick() {
    dispatch(
      openModalWithIngredient({
        title: "Детали ингредиента",
        ingredient: ingredient,
      })
    );
  }

  const onSetCount = useCallback(() => {
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
      onSetCount();
      return item;
    },
  });

  useEffect(() => {
    dispatch(setDrag(onDrag));
  }, [dispatch, onDrag, setDrag]);

  return (
    <li className={style.item + " pb-10"} key={ingredient._id} style={{ opacity }}>
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
      <p className="text text_type_main-default" style={{ textAlign: "center" }}>
        {ingredient.name}
      </p>
    </li>
  );
};

export default BurgerIngredient;
