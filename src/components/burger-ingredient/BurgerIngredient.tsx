import PropTypes from "prop-types";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredient.module.css";
export interface ingredientProp {
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

export const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number,
});

BurgerIngredient.propTypes = {
  ingredient: ingredientPropTypes,
};

function BurgerIngredient(props: ingredientProp) {
  return (
    <li className={style.item + " pb-10"} key={props._id}>
      {props.price > 1000 && <Counter count={1} size="default" />}
      <img src={props.image_mobile} alt={props.name} />
      <div className="text text_type_digits-default">
        {props.price} <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{props.name}</p>
    </li>
  );
}

export default BurgerIngredient;
