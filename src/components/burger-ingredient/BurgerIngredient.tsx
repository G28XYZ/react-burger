import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredient.module.css';
import { CollectedProps, DragObject, DropResult, IngredientProp } from './../../utils/types';
import { useAppDispatch, useAppSelector } from './../../services/store';
import { useDrag } from 'react-dnd';
import { FC, useEffect, useMemo, useState } from 'react';
import orderSlice from './../../services/reducers/order';
import { Link, useLocation } from 'react-router-dom';
import ingredientsSlice from './../../services/reducers/ingredients';

const BurgerIngredient: FC<IngredientProp> = ({ ingredient }) => {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { orderTotalPrice } = orderSlice.actions;
  const { setDrag } = ingredientsSlice.actions;

  const orderList = Array.from([...state.order.list, state.order.bun]);
  const orderListLength = useMemo<number>(() => orderList.filter((item) => item._id === ingredient._id).length, [
    ingredient._id,
    orderList,
  ]);

  const [count, setCount] = useState<number>(orderListLength);

  const [{ opacity, onDrag }, ref] = useDrag<DragObject, DropResult, CollectedProps>({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      onDrag: monitor.isDragging(),
    }),
    end(item) {
      return item;
    },
  });

  useEffect(() => {
    dispatch(setDrag({ onDrag }));
  }, [dispatch, onDrag, setDrag]);

  useEffect(() => {
    dispatch(orderTotalPrice({}));
  }, [count, dispatch, orderTotalPrice]);

  useEffect(() => {
    setCount(orderListLength);
  }, [orderListLength]);

  return (
    <li className={style.item + ' pb-10'} key={ingredient._id} style={{ opacity }}>
      {count > 0 && <Counter count={count} size='default' />}
      <Link to={`/ingredient/${ingredient._id}`} state={{ backgroundLocation: location }}>
        <img ref={ref} className={style.image} src={ingredient.image} alt={ingredient.name} />
      </Link>
      <p className={`${style.price} text text_type_digits-default pb-2`}>
        {ingredient.price} <CurrencyIcon type='primary' />
      </p>
      <p className='text text_type_main-default' style={{ textAlign: 'center' }}>
        {ingredient.name}
      </p>
    </li>
  );
};

export default BurgerIngredient;
