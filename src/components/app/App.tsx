import { useEffect, useLayoutEffect } from "react";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import appStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { fetchIngredients } from "../../services/actions/ingredients";
// import Preloader from "../Preloader";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../main/Main";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../login/Login";

// по совету наставника временно задана декларация чтобы обойти ошибку TS2322 возникающая на ui элементе Tab
declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

function App() {
  const ingredientsState = useAppSelector((state) => state.ingredients);
  const dispatch = useAppDispatch();
  const { loading } = ingredientsState;

  useLayoutEffect(() => {
    dispatch(fetchIngredients());
    console.log("render app");
  }, [dispatch]);

  return (
    <div className={appStyle.page}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
