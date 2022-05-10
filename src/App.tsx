import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import "./App.css";

function App() {
  return (
    <div className="page" style={{ display: "flex", flexDirection: "column" }}>
      <AppHeader />
      <BurgerIngredients />
    </div>
  );
}

export default App;
