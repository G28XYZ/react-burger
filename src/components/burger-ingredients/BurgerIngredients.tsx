import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";
import style from "./burger-ingredients.module.css";
import { Ingredient } from "../burger-ingredient/BurgerIngredient";

declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

interface PropsBurgerIngredients {
  orderList: Ingredient[];
  ingredients: { [key: string]: [] };
  handleSetOrder: () => void;
}

function BurgerIngredients({
  orderList,
  ingredients,
  handleSetOrder,
}: PropsBurgerIngredients) {
  const [current, setCurrent] = React.useState("bun");
  console.log();
  function handleTabClick(value: string) {
    console.log(value);
    setCurrent(value);
  }

  return (
    <section className={style.ingredients + " pt-10"}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <div style={{ display: "flex" }} className="pt-5 pb-10">
        {Object.keys(ingredients).map((name: string, i) => {
          return (
            <Tab
              key={i}
              value={name}
              active={current === name}
              onClick={handleTabClick}
            >
              {name}
            </Tab>
          );
        })}
      </div>
      <div className={style.container}>
        {Object.keys(ingredients).map((name, i) => {
          return (
            <div key={i} className="pb-10">
              <h3 className="text text_type_main-medium">{name}</h3>
              <ul className={style.list}>
                {ingredients[name].map((ingredient: any) => {
                  return (
                    <BurgerIngredient
                      ingredient={ingredient}
                      orderList={orderList}
                    />
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BurgerIngredients;
