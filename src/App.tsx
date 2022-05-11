import { useState } from "react";
import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import appStyle from "./App.module.css";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";
import { data } from "./utils/data";

function App() {
  const [order, setOrder] = useState({});

  function handleSetOrder() {
    setOrder({});
  }

  return (
    <div className={appStyle.page}>
      <AppHeader />
      <main className={appStyle.main} style={{}}>
        <BurgerIngredients order={order} handleSetOrder={handleSetOrder} />
        <BurgerConstructor order={order} handleSetOrder={handleSetOrder} />
      </main>
    </div>
  );
}

export default App;
