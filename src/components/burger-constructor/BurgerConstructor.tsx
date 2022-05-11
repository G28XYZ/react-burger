import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import { Ingredient } from "../burger-ingredient/BurgerIngredient";

interface PropsBurgerConstructor {
  orderList: Ingredient[];
  handleSetOrder: () => void;
}

function BurgerConstructor({
  orderList,
  handleSetOrder,
}: PropsBurgerConstructor) {
  const bun: Ingredient = orderList.filter(
    (item: Ingredient) => item.type === "bun"
  )[0];
  return (
    <section className={style.main}>
      <div className={style.elements}>
        <div className={style.element}>
          <ConstructorElement
            type="top"
            isLocked={false}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <div className={style.middle}>
          {orderList.map((item: any) => {
            return (
              <>
                {item.type !== "bun" ? (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <DragIcon type="primary" />
                    <div className={style.element}>
                      <ConstructorElement
                        isLocked={true}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image_mobile}
                      />
                    </div>
                  </div>
                ) : null}
              </>
            );
          })}
        </div>
        <div className={style.element}>
          <ConstructorElement
            type="bottom"
            isLocked={false}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "end",
          alignItems: "center",
          gap: 30,
        }}
        className="pr-8 pt-8"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <p className="text text_type_digits-medium">
            {orderList.reduce(
              (p: number, c: any) => (c.type !== "bun" ? p + c.price : p),
              bun.price * 2
            )}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
