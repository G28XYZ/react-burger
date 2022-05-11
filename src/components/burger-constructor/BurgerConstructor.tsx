import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { data } from "../../utils/data";
import style from "./burger-constructor.module.css";

interface PropsBurgerConstructor {
  order: object;
  handleSetOrder: () => void;
}

function BurgerConstructor({ order, handleSetOrder }: PropsBurgerConstructor) {
  const bun = data[0];
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
          {data.map((item) => {
            return (
              <>
                {item.type !== "bun" && item.price > 1000 ? (
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
            {data.reduce(
              (p, c) => (c.price > 1000 && c.type !== "bun" ? p + c.price : p),
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
