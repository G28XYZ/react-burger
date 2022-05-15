import { Ingredient } from "../../utils/types";
import style from "./ingredient-details.module.css";

function IngredientDetails({ ingredient }: { ingredient: Ingredient }) {
  const structureList = [
    ["calories", "Калории, ккал"],
    ["proteins", "Белки, г"],
    ["fat", "Жиры, г"],
    ["carbohydrates", "Углеводы, г"],
  ];

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

export default IngredientDetails;
