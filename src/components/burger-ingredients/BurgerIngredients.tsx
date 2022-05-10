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

const ingredietsName: Names = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

const sortedIngredients = data.reduce((p: any, c) => {
  p[ingredietsName[c.type]] = p[ingredietsName[c.type]]
    ? [...p[ingredietsName[c.type]], c]
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
    <section className="ingredients p-10">
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <div style={{ display: "flex" }} className="pt-5">
        {Object.keys(ingredietsName).map((name, i) => {
          return (
            <Tab
              key={i}
              value={name}
              active={current === name}
              onClick={handleTabClick}
            >
              {ingredietsName[name]}
            </Tab>
          );
        })}
      </div>
      <div>
        {Object.keys(ingredietsName).map((name, i) => {
          const title = ingredietsName[name];
          return (
            <div key={i}>
              <h3>{title}</h3>
              <ul>
                {sortedIngredients[title].map((ingredient: any) => {
                  return <li key={ingredient._id}>{ingredient.name}</li>;
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
