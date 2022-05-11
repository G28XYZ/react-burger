import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";
import style from "./burger-ingredients.module.css";
import { Ingredient } from "../burger-ingredient/BurgerIngredient";
import { ingredientPropTypes } from "../burger-ingredient/BurgerIngredient";

declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

interface PropsBurgerIngredients {
  orderList: Ingredient[];
  ingredients: { [key: string]: [] };
}

const ingredientsPropTypes = PropTypes.shape({
  Булки: PropTypes.arrayOf(ingredientPropTypes),
  Начинки: PropTypes.arrayOf(ingredientPropTypes),
  Соусы: PropTypes.arrayOf(ingredientPropTypes),
});

BurgerIngredients.propsType = {
  orderList: PropTypes.arrayOf(ingredientPropTypes),
  ingredients: ingredientsPropTypes,
};

function BurgerIngredients({ orderList, ingredients }: PropsBurgerIngredients) {
  const [current, setCurrent] = React.useState("Булки");
  function handleTabClick(value: string) {
    console.log(value);
    setCurrent(value);
  }

  const ingredientNames = Object.keys(ingredients);

  function renderIngredientList(ingredient: Ingredient, index: number) {
    return (
      <React.Fragment key={index}>
        <BurgerIngredient ingredient={ingredient} orderList={orderList} />
      </React.Fragment>
    );
  }

  return (
    <section className={style.ingredients + " pt-10"}>
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
              <ul className={style.list}>{ingredients[name].map(renderIngredientList)}</ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BurgerIngredients;
