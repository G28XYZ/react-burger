import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";
import { data } from "../../utils/data";
import style from "./burger-ingredients.module.css";

declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

interface Names {
  [key: string]: string;
}

const ingredientsName: Names = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

const sortedIngredients = data.reduce((p: any, c) => {
  p[ingredientsName[c.type]] = p[ingredientsName[c.type]]
    ? [...p[ingredientsName[c.type]], c]
    : [c];
  return p;
}, {});

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("bun");

  function handleTabClick(value: string) {
    console.log(value);
    setCurrent(value);
  }

  return (
    <section className={style.ingredients + " pt-10"}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <div style={{ display: "flex" }} className="pt-5 pb-10">
        {Object.keys(ingredientsName).map((name, i) => {
          return (
            <Tab
              key={i}
              value={name}
              active={current === name}
              onClick={handleTabClick}
            >
              {ingredientsName[name]}
            </Tab>
          );
        })}
      </div>
      <div className={style.container}>
        {Object.keys(ingredientsName).map((name, i) => {
          const title = ingredientsName[name];
          return (
            <div key={i} className="pb-10">
              <h3 className="text text_type_main-medium">{title}</h3>
              <ul className={style.list}>
                {sortedIngredients[title].map((ingredient: any) => {
                  return <BurgerIngredient {...ingredient} />;
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
