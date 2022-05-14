import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import { Ingredient } from "../burger-ingredient/BurgerIngredient";
import OrderDetails from "../order-modal/OrderDetails";

interface PropsBurgerConstructor {
  orderList: Ingredient[];
  onOpenModal: ({}) => void;
}

function BurgerConstructor({ orderList, onOpenModal }: PropsBurgerConstructor) {
  const bun: Ingredient = orderList.reduce((p, c: Ingredient) => (c.type === "bun" ? c : p));

  function onOrderDetails() {
    onOpenModal({ children: <OrderDetails /> });
  }

  function renderOrderItem(item: Ingredient) {
    return item.type !== "bun" ? (
      <div key={item._id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
        <div className={style.middle}>{orderList.map(renderOrderItem)}</div>
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
      <div className={style.ordinare + " p-8"}>
        <div className={style.total}>
          <p className="text text_type_digits-medium">
            {orderList.reduce(
              (p: number, c: Ingredient) => (c.type !== "bun" ? p + c.price : p),
              bun.price * 2
            )}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={onOrderDetails}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
