import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");

  function handleTabClick(value: string) {
    console.log(value);
    setCurrent(value);
  }

  return (
    <>
      <div style={{ display: "flex" }} className="p-10">
        <Tab value="bun" active={current === "bun"} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={handleTabClick}
        >
          Соусы
        </Tab>
        <Tab
          value="filling"
          active={current === "filling"}
          onClick={handleTabClick}
        >
          Начинки
        </Tab>
      </div>
    </>
  );
}

export default BurgerIngredients;
