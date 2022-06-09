import {
  createRef,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";
import style from "./burger-ingredients.module.css";
import { Ingredient, ISorted } from "../../utils/types";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-modal/IngredientDetails";
import { RootState, useAppSelector } from "../../services/store";

const shortid = require("shortid");

function BurgerIngredients() {
  const state = useAppSelector((state: RootState) => state);
  const { ingredientInModal } = state.modal;
  const ingredients: ISorted = state.ingredients.sortedIngredients;
  const ingredientNames = Object.keys(ingredients);

  const [current, setCurrent] = useState("Булки");

  // создание n рефов из массива с названиями категории ингредиента
  // рефы будут использованы для прокрутки к нужному месту в списке
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

  const renderIngredientsList = (ingredient: Ingredient) => {
    return <BurgerIngredient key={ingredient._id} ingredient={ingredient} />;
  };

  useEffect(() => {}, []);

  return (
    <section className={style.ingredients + " pt-10 pl-5"}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <div className={style.tabs + " pt-5 pb-10"}>
        {ingredientNames.map((name: string, i) => {
          return (
            <Tab
              key={`bun${i}`}
              value={name}
              active={current === name}
              onClick={handleTabClick}
            >
              {name}
            </Tab>
          );
        })}
      </div>
      <div className={style.container + " custom-scroll"}>
        {ingredientNames.map((name, i) => {
          const divRef: { current: null | HTMLDivElement } =
            refsElement.current[i];
          return (
            <div key={i} className="pb-10" id={name} ref={divRef}>
              <h3 className="text text_type_main-medium">{name}</h3>
              <ul className={style.list}>
                {ingredients[name].map(renderIngredientsList)}
              </ul>
            </div>
          );
        })}
      </div>
      {ingredientInModal && (
        <Modal title="Детали заказа">
          <IngredientDetails ingredient={ingredientInModal} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
