import { createRef, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";
import style from "./burger-ingredients.module.css";
import { Ingredient } from "../burger-ingredient/BurgerIngredient";
import { OpenModalProps } from "../app/App";

declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

interface PropsBurgerIngredients {
  orderList: Ingredient[] | {}[];
  ingredients: { [key: string]: Ingredient[] };
  onOpenModal: ({ title, children }: OpenModalProps) => void;
}

function BurgerIngredients({ orderList, ingredients, onOpenModal }: PropsBurgerIngredients) {
  const ingredientNames = Object.keys(ingredients);

  const [current, setCurrent] = useState("Булки");
  const refsElement = useRef(
    ingredientNames.map((): { current: null | HTMLDivElement } => createRef())
  );

  function handleTabClick(value: string) {
    const index = ingredientNames.findIndex((name) => name === value);
    const element = refsElement.current[index].current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setCurrent(value);
  }

  function renderIngredientsList(ingredient: Ingredient) {
    return (
      <BurgerIngredient
        key={ingredient._id}
        ingredient={ingredient}
        orderList={orderList}
        onOpenModal={onOpenModal}
      />
    );
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
      <div className={style.container + " custom-scroll"}>
        {ingredientNames.map((name, i) => {
          const divRef: { current: null | HTMLDivElement } = refsElement.current[i];
          return (
            <div key={i} className="pb-10" id={name} ref={divRef}>
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
