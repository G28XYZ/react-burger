import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import "./App.css";
import BurgerConstructor from "./components/BurgerConstructor";

function App() {
  return (
    <div className="page">
      <AppHeader />
      <main style={{ display: "flex" }}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
