import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");

  function handleTabClick(value: string): void {
    console.log(value);
    setCurrent(value);
  }

  return (
    <div style={{ display: "flex" }} className="p-10">
      <Tab value="one" active={current === "one"} onClick={handleTabClick}>
        <>One</>
      </Tab>
      <Tab value="two" active={current === "two"} onClick={handleTabClick}>
        <>Two</>
      </Tab>
      <Tab value="three" active={current === "three"} onClick={handleTabClick}>
        <>Three</>
      </Tab>
    </div>
  );
}

export default BurgerIngredients;
