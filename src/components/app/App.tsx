import { useEffect } from "react";
import AppHeader from "../app-header/AppHeader";
import appStyle from "./app.module.css";
import { fetchIngredients } from "../../services/actions/ingredients";
// import Preloader from "../Preloader";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { Route, Routes } from "react-router-dom";
import Main from "../main/Main";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import Login from "../auth/Login";
import Profile from "../profile/Profile";
import Register from "../auth/Register";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import { onGetUser, onRefreshToken } from "../../services/actions/user";
import { getCookie } from "../../utils/getCookie";
import PrivateRoute from "../private-route/PrivateRoute";

// по совету наставника временно задана декларация чтобы обойти ошибку TS2322 возникающая на ui элементе Tab
declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

function App() {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.user);

  useEffect(() => {
    const token = getCookie("token");
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (token) {
      dispatch(onGetUser(token)).then(({ payload }) => {
        if (!refreshToken) {
          console.log("Авторизуйтесь");
          return;
        }
        // accessToken истек
        if (!payload) {
          dispatch(onRefreshToken(refreshToken));
        }
      });
    } else {
      console.log("Авторизуйтесь");
    }
    console.log("render app");
  }, [dispatch]);

  useEffect(() => {
    if (loggedIn) dispatch(fetchIngredients());
  }, [dispatch, loggedIn]);

  return (
    <div className={appStyle.page}>
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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<PrivateRoute />}>
          <Route path="" element={<ForgotPassword />} />
        </Route>
        <Route path="/reset-password" element={<PrivateRoute />}>
          <Route path="" element={<ResetPassword />} />
        </Route>
        <Route path="/login" element={<PrivateRoute />}>
          <Route path="" element={<Login />} />
        </Route>
        <Route path="/register" element={<PrivateRoute />}>
          <Route path="" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
