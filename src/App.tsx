import React from "react";
import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import appStyle from "./App.module.css";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";
import { data } from "./utils/data";

interface Names {
  [key: string]: string;
}

class App extends React.Component {
  ingredientsName: Names = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };
  state = {
    ingredients: this.setIngredients(),
    order: [...data.filter((item) => item.price > 1000)],
  };

  setIngredients() {
    const sortedIngredients = data.reduce((p: any, c) => {
      p[this.ingredientsName[c.type]] = p[this.ingredientsName[c.type]]
        ? [...p[this.ingredientsName[c.type]], c]
        : [c];
      return p;
    }, {});

    return sortedIngredients;
  }

  render() {
    return (
      <div className={appStyle.page}>
        <AppHeader />
        <main className={appStyle.main}>
          <BurgerIngredients orderList={this.state.order} ingredients={this.state.ingredients} />
          <BurgerConstructor orderList={this.state.order} />
        </main>
      </div>
    );
  }
}

export default App;
