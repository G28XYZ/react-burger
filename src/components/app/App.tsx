import { useEffect } from "react";
import AppHeader from "../app-header/AppHeader";
import appStyle from "./app.module.css";
import { fetchIngredients } from "../../services/actions/ingredients";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  Main,
  Profile,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Orders,
  Feed,
  NotFound,
} from "../../pages";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import { onGetUser, onRefreshToken } from "../../services/actions/user";
import { getCookie } from "../../utils/getCookie";
import PrivateRoute from "../private-route/PrivateRoute";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import Modal from "../modal/Modal";

// по совету наставника временно задана декларация чтобы обойти ошибку TS2322 возникающая на ui элементе Tab
declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

function App() {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.user);
  const location = useLocation();
  const locationState = location.state as { backgroundLocation?: Location };
  const navigation = useNavigate();

  const handleCloseModal = () => {
    navigation("/");
  };

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
      <Routes location={locationState?.backgroundLocation || location}>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="" element={<Main />} />
        </Route>
        <Route path="/profile" element={<ProtectedRoute />}>
          <Route path="" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/ingredient/:id" element={<ProtectedRoute />}>
          <Route path="" element={<IngredientDetails />} />
        </Route>
        <Route path="/feed" element={<ProtectedRoute />}>
          <Route path="" element={<Feed />} />
        </Route>

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
}

export default App;
