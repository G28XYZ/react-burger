import {
  Button,
  CurrencyIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import { Ingredient } from "../../utils/types";
import OrderDetails from "../order-modal/OrderDetails";
import Modal from "../modal/Modal";
import { onRegisterOrder } from "../../services/actions/order";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../services/store";
import orderSlice from "../../services/reducers/order";
import modalSlice from "../../services/reducers/modal";
import { useDrop } from "react-dnd";
import ConstructorIngredient from "../constructor-ingredient/ConstructorIngredient";

function BurgerConstructor() {
  const state = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const orderList = state.order.list;
  const { bun, totalPrice } = state.order;
  const { addBunToOrder, addToOrder } = orderSlice.actions;
  const { openModalWithOrder } = modalSlice.actions;

  function handleOrderClick() {
    dispatch(
      onRegisterOrder({
        ingredients: [
          bun._id,
          ...orderList.map((item: Ingredient) => item._id),
          bun._id,
        ],
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

  const [, dropTarget] = useDrop({
    accept: ["constructor_ingredient", "ingredient"],
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
      if (itemType === "ingredient") {
        item.type === "bun"
          ? handleAddBunToOrder(item)
          : handleAddToOrder(item);
      }
      return ingredient;
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

        <div className={`${style.middle} custom-scroll`}>
          {state.order.list.length >= 1 &&
            orderList.map((item: Ingredient) => (
              <ConstructorIngredient key={item.shortId} item={item} />
            ))}
        </div>

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
