import { createRef, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";
import style from "./burger-ingredients.module.css";
import { Ingredient, ISorted } from "../../utils/types";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-modal/IngredientDetails";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { InView } from "react-intersection-observer";
import modalSlice from "../../services/reducers/modal";

function BurgerIngredients() {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { ingredientInModal } = state.modal;
  const { closeModal } = modalSlice.actions;
  const ingredients: ISorted = state.ingredients.sortedIngredients;
  const ingredientNames = Object.keys(ingredients);
  const [currentIngredientType, setCurrentIngredientType] = useState("Булки");
  // создание n рефов из массива с названиями категории ингредиента
  // рефы будут использованы для прокрутки к нужному месту в списке
  // при нажатии на соответствующий таб
  const refsElement = useRef(
    ingredientNames.map((): { current: null | HTMLDivElement } => createRef())
  );

  function handleTabClick(value: string) {
    const index = ingredientNames.findIndex((name) => name === value);
    const element = refsElement.current[index].current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setCurrentIngredientType(value);
  }

  const renderIngredientsList = (ingredient: Ingredient) => {
    return <BurgerIngredient key={ingredient._id} ingredient={ingredient} />;
  };

  function onChangeView(isView: boolean, entry: IntersectionObserverEntry) {
    const nameIngredient = entry.target.id;
    if (isView) {
      setCurrentIngredientType(nameIngredient);
    }
  }

  function handleCloseModal() {
    dispatch(closeModal());
  }

  return (
    <section className={style.ingredients + " pt-10 pl-5"}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <div className={style.tabs + " pt-5 pb-10"}>
        {ingredientNames.map((name: string, i) => {
          return (
            <Tab
              key={i}
              value={name}
              active={currentIngredientType === name}
              onClick={handleTabClick}
            >
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
              <InView threshold={0.5} onChange={onChangeView}>
                {({ ref }) => {
                  return (
                    <>
                      <h3 className="text text_type_main-medium">{name}</h3>
                      <ul className={style.list} ref={ref} id={name}>
                        {ingredients[name].map(renderIngredientsList)}
                      </ul>
                    </>
                  );
                }}
              </InView>
            </div>
          );
        })}
      </div>
      {ingredientInModal && (
        <Modal title="Детали заказа" onCloseModal={handleCloseModal}>
          <IngredientDetails ingredient={ingredientInModal} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
