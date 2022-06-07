import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import { Ingredient } from "../../utils/types";
import OrderDetails from "../order-modal/OrderDetails";
import Modal from "../modal/Modal";
import { useEffect } from "react";
import { onRegisterOrder } from "../../services/actions/order";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../services/store";
import orderSlice from "../../services/reducers/order";

function BurgerConstructor() {
  const state = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const orderList = state.order.list;
  const { loading } = state.ingredients;
  const { bun, totalPrice, registerOrder } = state.order;
  const { ingredients } = state.ingredients;
  const { addBunToOrder, addToOrder, orderTotalPrice } = orderSlice.actions;

  function handleOrderClick() {
    dispatch(
      onRegisterOrder({
        ingredients: [
          bun._id,
          ...orderList.map((item: Ingredient) => item._id),
        ],
      })
    );
  }

  function onCloseModal() {
    // dispatch({ type: REGISTER_ORDER, register: false, name: "", id: 0 });
  }

  useEffect(() => {
    if (loading) {
      dispatch(
        addBunToOrder(
          ingredients.filter(
            (item: Ingredient) => item.price > 1000 && item.type === "bun"
          )[0]
        )
      );
      dispatch(
        addToOrder(
          ingredients.filter(
            (item: Ingredient) => item.price > 1000 && item.type !== "bun"
          )[0]
        )
      );
    }
  }, [loading]);

  useEffect(() => {
    dispatch(orderTotalPrice({ orderList }));
  }, [dispatch, orderList, orderTotalPrice, totalPrice]);

  function renderOrderItem(item: Ingredient) {
    return item.type !== "bun" ? (
      <div key={item._id} className={style.element_container}>
        <DragIcon type="primary" />
        <div className={style.element}>
          <ConstructorElement
            isLocked={false}
            text={item.name}
            price={item.price}
            thumbnail={item.image_mobile}
          />
        </div>
      </div>
    ) : null;
  }

  return (
    <section className={style.main + " pr-5"}>
      <div className={style.elements}>
        <div className={style.element}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        {state.order.list.length >= 1 && (
          <div className={style.middle + " custom-scroll"}>
            {orderList.map(renderOrderItem)}
          </div>
        )}
        <div className={style.element}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div className={style.ordinary + " p-8"}>
        <div className={style.total}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>

      {registerOrder && (
        <Modal title="" onCloseModal={onCloseModal}>
          <OrderDetails orderId={state.order.id} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
