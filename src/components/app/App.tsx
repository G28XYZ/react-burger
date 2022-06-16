import { useLayoutEffect } from "react";
import AppHeader from "../app-header/AppHeader";
import appStyle from "./app.module.css";
import { fetchIngredients } from "../../services/actions/ingredients";
// import Preloader from "../Preloader";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../main/Main";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../auth/Login";
import Profile from "../Profile/Profile";
import Register from "../auth/Register";
import FogotPassword from "../auth/FogotPassword";
import ResetPassword from "../auth/ResetPassword";
import { onGetUser } from "../../services/actions/user";

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
    dispatch(onGetUser());
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/fogot-password" element={<FogotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
