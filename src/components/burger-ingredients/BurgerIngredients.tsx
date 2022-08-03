import { createRef, FC, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from './../burger-ingredient/BurgerIngredient';
import style from './burger-ingredients.module.css';
import { Ingredient, ISorted, TRefsElement } from './../../utils/types';
import { useAppSelector } from './../../services/store';
import { InView } from 'react-intersection-observer';

const BurgerIngredients: FC = () => {
  const state = useAppSelector((state) => state.ingredients);

  const ingredients: ISorted = state.sortedIngredients;
  const ingredientNames = Object.keys(ingredients);
  const [currentIngredient, setCurrentIngredient] = useState<string>('Булки');
  // создание n рефов из массива с названиями категории ингредиента
  // рефы будут использованы для прокрутки к нужному месту в списке
  // при нажатии на соответствующий таб
  const refsElement = useRef<TRefsElement>(ingredientNames.map((): { current: null | HTMLDivElement } => createRef()));

  function handleTabClick(value: string) {
    const index = ingredientNames.findIndex((name) => name === value);
    const element = refsElement.current[index].current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setCurrentIngredient(value);
  }

  const renderIngredientsList: FC<Ingredient> = (ingredient) => {
    return <BurgerIngredient key={ingredient._id} ingredient={ingredient} />;
  };

  function onChangeView(isView: boolean, entry: IntersectionObserverEntry) {
    const nameIngredient = entry.target.id;
    if (isView) {
      setCurrentIngredient(nameIngredient);
    }
  }

  return (
    <section className={style.ingredients + ' pt-10 pl-5'}>
      <h2 className='text text_type_main-large'>Соберите бургер</h2>
      <div className={style.tabs + ' pt-5 pb-10'}>
        {ingredientNames.map((name: string, i) => {
          return (
            <Tab key={i} value={name} active={currentIngredient === name} onClick={handleTabClick}>
              {name}
            </Tab>
          );
        })}
      </div>
      <div className={style.container + ' custom-scroll'}>
        {ingredientNames.map((name, i) => {
          const divRef = refsElement.current[i];
          return (
            <div key={i} className='pb-10' id={name} ref={divRef}>
              <InView threshold={0.5} onChange={onChangeView}>
                {({ ref }) => {
                  return (
                    <>
                      <h3 className='text text_type_main-medium'>{name}</h3>
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
    </section>
  );
};

export default BurgerIngredients;
