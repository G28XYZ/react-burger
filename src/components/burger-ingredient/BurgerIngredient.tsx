import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredient.module.css";

export interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface ingredientProp {
  ingredient: Ingredient;
  orderList: Ingredient[];
  onOpenModal: ({}) => void;
}

function BurgerIngredient({ ingredient, orderList, onOpenModal }: ingredientProp) {
  const structureList = [
    ["calories", "Калории, ккал"],
    ["proteins", "Белки, г"],
    ["fat", "Жиры, г"],
    ["carbohydrates", "Углеводы, г"],
  ];

  function getChildren() {
    return (
      <div className={style.modal}>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <p className="text text_type_main-medium  pb-5">{ingredient.name}</p>
        <ul className={style.structure + " text text_type_main-default text_color_inactive"}>
          {structureList.map((element, i) => {
            const key = element[0] as keyof Ingredient;
            const title = element[1];
            return (
              <li key={ingredient._id + i}>
                <span>{title}</span>
                <p className="text_type_digits-default">{ingredient[key]}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  function onHandleClick() {
    onOpenModal({ title: "Детали ингредиента", children: getChildren() });
  }

  return (
    <li className={style.item + " pb-10"} key={ingredient._id} onClick={onHandleClick}>
      {orderList.includes(ingredient) && <Counter count={1} size="default" />}
      <img src={ingredient.image} alt={ingredient.name} />
      <div className="text text_type_digits-default">
        {ingredient.price} <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default" style={{ textAlign: "center" }}>
        {ingredient.name}
      </p>
    </li>
  );
}

export default BurgerIngredient;
