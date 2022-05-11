import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

import { data } from "../../utils/data";
import style from "./burger-constructor.module.css";

function BurgerConstructor() {
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
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {item.type !== "bun" ? (
                  <>
                    <DragIcon type="primary" />
                    <div className={style.element}>
                      <ConstructorElement
                        isLocked={true}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image_mobile}
                      />
                    </div>
                  </>
                ) : null}
              </div>
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
          <p className="text text_type_digits-medium">610</p>
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
