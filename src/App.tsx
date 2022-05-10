import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import appStyle from "./App.module.css";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";

function App() {
  return (
    <div className={appStyle.page}>
      <AppHeader />
      <main className={appStyle.main} style={{}}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
