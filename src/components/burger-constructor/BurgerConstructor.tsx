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
import { useStore } from "../../services/StoreProvider";
import { useEffect } from "react";
import {
  ADD_BUN_TO_ORDER,
  ADD_TO_ORDER,
  onRegisterOrder,
  ORDER_TOTAL_PRICE,
} from "../../services/actions/order";
import { OPEN_MODAL_WITH_ORDER } from "../../services/actions/modal";

function BurgerConstructor() {
  const [state, dispatch] = useStore();
  const orderList = state.order.list;
  const [{ order, ingredients, loading }, { bun, totalPrice }] = [
    state,
    state.order,
  ];

  const { orderInModal } = state.modal;

  function handleOrderClick() {
    onRegisterOrder(dispatch, {
      ingredients: [bun._id, ...orderList.map((item) => item._id), bun._id],
    });
    dispatch({ type: OPEN_MODAL_WITH_ORDER });
  }

  useEffect(() => {
    if (loading) {
      dispatch({
        type: ADD_TO_ORDER,
        orderList: ingredients.filter(
          (item: Ingredient) => item.price < 1000 && item.type !== "bun"
        ),
      });
      dispatch({
        type: ADD_BUN_TO_ORDER,
        bun: ingredients.filter(
          (item: Ingredient) => item.price > 1000 && item.type === "bun"
        )[0],
      });
    }
  }, [loading]);

  useEffect(() => {
    dispatch({ type: ORDER_TOTAL_PRICE, orderList });
  }, [dispatch, orderList, totalPrice]);

  function renderOrderItem(item: Ingredient) {
    return item.type !== "bun" ? (
      <div key={item.shortId} className={style.element_container}>
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
        {order.list.length >= 1 && (
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

      {orderInModal && (
        <Modal title="">
          <OrderDetails orderId={order.id} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
