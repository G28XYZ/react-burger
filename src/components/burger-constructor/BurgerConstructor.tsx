import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import { Ingredient } from "../../utils/types";
import OrderDetails from "../order-modal/OrderDetails";
import { OpenModalProps } from "../../utils/types";
import Modal from "../modal/Modal";
import { useStore } from "../../services/StoreProvider";
import { useEffect } from "react";
import { ORDER_TOTAL_PRICE } from "../../services/actions/order";

interface PropsBurgerConstructor {
  onOpenModal: ({ title, inIngredient, inOrder }: OpenModalProps) => void;
  onCloseModal: () => void;
  inOrder: boolean | undefined;
}

function BurgerConstructor({ onOpenModal, onCloseModal, inOrder }: PropsBurgerConstructor) {
  const [state, dispatch] = useStore();
  const orderList = Object.assign(state.order.list);
  const [{ order }, { bun, totalPrice }] = [state, state.order];

  function handleOrderClick() {
    onOpenModal({ inOrder: true });
  }

  useEffect(() => {
    console.log(totalPrice);
    dispatch({ type: ORDER_TOTAL_PRICE });
  }, [totalPrice]);

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
        {order.list.length > 1 && (
          <div className={style.middle + " custom-scroll"}>{orderList.map(renderOrderItem)}</div>
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
          <p className="text text_type_digits-medium">{totalPrice || 0}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>

      {inOrder && (
        <Modal title="" onCloseModal={onCloseModal}>
          <OrderDetails orderId={order.id} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
