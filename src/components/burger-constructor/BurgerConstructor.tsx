import { Button, CurrencyIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import { Ingredient } from './../../utils/types';
import OrderDetails from './../order-info/OrderInfo';
import Modal from './../modal/Modal';
import { onRegisterOrder } from './../../services/actions/order';
import { useAppDispatch, useAppSelector } from './../../services/store';
import orderSlice from './../../services/reducers/order';
import modalSlice from './../../services/reducers/modal';
import { useDrop } from 'react-dnd';
import ConstructorIngredient from './../constructor-ingredient/ConstructorIngredient';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const BurgerConstructor: FC = () => {
  const state = useAppSelector((state) => state);
  const { loggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const orderList = state.order.list;
  const { bun, totalPrice } = state.order;
  const { addBunToOrder, addToOrder, resetOrder } = orderSlice.actions;
  const { openModalWithOrder, closeModal } = modalSlice.actions;
  const navigate = useNavigate();

  function handleOrderClick() {
    if (loggedIn === false) {
      navigate('/login');
      return;
    }
    dispatch(
      onRegisterOrder({
        ingredients: [bun._id, ...orderList.map((item: Ingredient) => item._id), bun._id],
        token: sessionStorage.getItem('token') || '',
      })
    );
    dispatch(openModalWithOrder());
  }

  function handleAddBunToOrder(ingredient: Ingredient) {
    dispatch(addBunToOrder({ ingredient }));
  }

  function handleAddToOrder(ingredient: Ingredient) {
    dispatch(
      addToOrder({
        ingredient,
        replaceIngredient: state.order.replaceIngredient,
      })
    );
  }

  function handleCloseModal() {
    dispatch(resetOrder({}));
    dispatch(closeModal());
  }

  const [, dropTarget] = useDrop({
    accept: ['constructor_ingredient', 'ingredient'],
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      handlerId: monitor.getHandlerId(),
    }),
    drop(ingredient, monitor) {
      const itemType = monitor.getItemType();
      let item = Object.assign(ingredient as Ingredient);
      if (item.constructorId === undefined) {
        item = Object.assign({ constructorId: orderList.length }, item);
      }
      if (itemType === 'ingredient') {
        item.type === 'bun' ? handleAddBunToOrder(item) : handleAddToOrder(item);
      }
      return ingredient;
    },
  });

  return (
    <section className={style.main + ' pr-5'} ref={dropTarget}>
      <div className={style.elements}>
        <div className={style.element}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>

        <div className={`${style.middle} custom-scroll`}>
          {state.order.list.length >= 1 &&
            orderList.map((item: Ingredient) => <ConstructorIngredient key={item.shortId} item={item} />)}
        </div>

        <div className={style.element}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div className={style.ordinary + ' p-8'}>
        <div className={style.total}>
          <p className='text text_type_digits-medium'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' size='large' onClick={handleOrderClick} disabled={!bun.price}>
          Оформить заказ
        </Button>
      </div>

      {state.modal.orderInModal && (
        <Modal onCloseModal={handleCloseModal}>
          <OrderDetails orderId={state.order.id} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
