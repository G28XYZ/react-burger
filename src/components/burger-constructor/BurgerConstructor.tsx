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
import { RootState, useAppDispatch, useAppSelector } from "../../services/store";
import orderSlice from "../../services/reducers/order";
import modalSlice from "../../services/reducers/modal";
import { useDrop } from "react-dnd";

function BurgerConstructor() {
  const state = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const orderList = state.order.list;
  const { bun, totalPrice } = state.order;
  const { addBunToOrder, addToOrder, orderTotalPrice } = orderSlice.actions;
  const { openModalWithOrder } = modalSlice.actions;

  function handleOrderClick() {
    dispatch(
      onRegisterOrder({
        ingredients: [bun._id, ...orderList.map((item: Ingredient) => item._id), bun._id],
      })
    );
    dispatch(openModalWithOrder());
  }

  function handleAddBunToOrder(ingredient: Ingredient) {
    dispatch(addBunToOrder({ ingredient }));
  }

  function handleAddToOrder(ingredient: Ingredient) {
    dispatch(addToOrder({ ingredient }));
  }

  function handleDrop(item: any) {
    console.log(item);
  }

  useEffect(() => {
    dispatch(orderTotalPrice());
  }, [dispatch, orderList, orderTotalPrice, totalPrice]);

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

  const [{ isHover, handlerId }, dropTarget] = useDrop({
    accept: ["sorted_ingredient", "ingredient"],
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      handlerId: monitor.getHandlerId(),
    }),
    hover(...args) {
      //если на элемент конструктора наведен добавляемый ингредиент
      const [item, monitor, itemType] = args as any;
      // console.log(args);
      if (itemType === "NEW_INGREDIENT" && item.type !== "bun") {
        //то записываем отдельное поле стора, индекс куда и что перетаскиваем
        //  dispatch({
        //          type: ConstructorActionTypes.SET_DRAGGED,
        //          payload: {
        //            index: draggedIndex,
        //            data: item
        //          }
        //      })
      }

      if (itemType === "SORT_INGREDIENT") {
        //  dispatch({
        //      type: ConstructorActionTypes.MOVE,
        //      payload: {
        //        from: item.ingredient.constructorId,
        //        to: ingredient.constructorId
        //      }
        //    })
      }
    },
    drop(ingredient) {
      const item = ingredient as Ingredient;
      item.type === "bun" ? handleAddBunToOrder(item) : handleAddToOrder(item);
    },
  });

  return (
    <section className={style.main + " pr-5"} ref={dropTarget}>
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
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>

      {state.modal.orderInModal && (
        <Modal title="">
          <OrderDetails orderId={state.order.id} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
