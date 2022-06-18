import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import { Ingredient, IStateIngredients } from "../../utils/types";
import style from "./ingredient-details.module.css";

const shortid = require("shortid");

function IngredientDetails() {
  const params = useParams();
  const { loading, ingredients } = useAppSelector(
    (state) => state.ingredients as IStateIngredients
  );
  const [ingredient, setIngredient] = useState({} as Ingredient);
  const location = useLocation() as { state: { backgroundLocation: Location } };
  const background = location.state?.backgroundLocation;

  useEffect(() => {
    if (loading)
      setIngredient(ingredients.find((item: Ingredient) => item._id === params.id) as Ingredient);
  }, [ingredients, loading, params.id]);

  const structureList = [
    ["calories", "Калории, ккал"],
    ["proteins", "Белки, г"],
    ["fat", "Жиры, г"],
    ["carbohydrates", "Углеводы, г"],
  ];

  return (
    <div className={`${style.modal} ${!background && "pt-30"}`}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium  pb-5">{ingredient.name}</p>
      <ul className={style.structure + " text text_type_main-default text_color_inactive"}>
        {structureList.map((element, i) => {
          const key = element[0] as keyof Ingredient;
          const title = element[1];
          return (
            <li key={shortid.generate()}>
              <span>{title}</span>
              <p className="text_type_digits-default">{ingredient[key]}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default IngredientDetails;
