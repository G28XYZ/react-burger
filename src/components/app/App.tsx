import { FC, useEffect } from "react";
import AppHeader from "../app-header/AppHeader";
import appStyle from "./app.module.css";
import { fetchIngredients } from "../../services/actions/ingredients";
import { useAppDispatch } from "../../services/store";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  Main,
  Profile,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Orders,
  ProfileForm,
  Feed,
  NotFound,
} from "../../pages";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import { onGetUser, onRefreshToken } from "../../services/actions/user";
import PrivateRoute from "../private-route/PrivateRoute";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import Modal from "../modal/Modal";

// по совету наставника временно задана декларация чтобы обойти ошибку TS2322 возникающая на ui элементе Tab
declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const locationState = location.state as { backgroundLocation?: Location };
  const navigation = useNavigate();

  const handleCloseModal = () => {
    navigation("/");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (token) {
      dispatch(onGetUser(token)).then(({ payload }) => {
        if (!refreshToken) {
          console.log("Авторизуйтесь");
          return;
        }
        if (!payload) {
          console.log("accessToken истек");
          dispatch(onRefreshToken(refreshToken));
        }
      });
    } else {
      console.log("Авторизуйтесь");
    }
    console.log("render app");
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={appStyle.page}>
      <AppHeader />
      <Routes location={locationState?.backgroundLocation || location}>
        <Route path="" element={<Main />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />}>
            <Route path="" element={<ProfileForm />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="feed" element={<Feed />} />
        </Route>

        <Route path="ingredient/:id" element={<IngredientDetails />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {locationState?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredient/:id"
            element={
              <Modal onCloseModal={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
