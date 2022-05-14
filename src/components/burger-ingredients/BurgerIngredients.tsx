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
  ingredients: { [key: string]: Ingredient[] };
}

function BurgerIngredients({ orderList, ingredients }: PropsBurgerIngredients) {
  const [current, setCurrent] = React.useState("Булки");

  function handleTabClick(value: string) {
    console.log(value);
    setCurrent(value);
  }

  const ingredientNames = Object.keys(ingredients);

  function renderIngredientsList(ingredient: Ingredient) {
    return <BurgerIngredient key={ingredient._id} ingredient={ingredient} orderList={orderList} />;
  }

  return (
    <section className={style.ingredients + " pt-10 pl-5"}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <div style={{ display: "flex" }} className="pt-5 pb-10">
        {ingredientNames.map((name: string, i) => {
          return (
            <Tab key={i} value={name} active={current === name} onClick={handleTabClick}>
              {name}
            </Tab>
          );
        })}
      </div>
      <div className={style.container}>
        {ingredientNames.map((name, i) => {
          return (
            <div key={i} className="pb-10">
              <h3 className="text text_type_main-medium">{name}</h3>
              <ul className={style.list}>{ingredients[name].map(renderIngredientsList)}</ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BurgerIngredients;
