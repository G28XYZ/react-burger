import { FC, useCallback, useEffect, useMemo } from "react";
import AppHeader from "./../app-header/AppHeader";
import appStyle from "./app.module.css";
import { fetchIngredients } from "./../../services/actions/ingredients";
import { useAppDispatch, useAppSelector } from "./../../services/store";
import { Location, Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
} from "./../../pages";
import ProtectedRoute from "./../protected-route/ProtectedRoute";
import { onGetUser, onRefreshToken } from "./../../services/actions/user";
import PrivateRoute from "./../private-route/PrivateRoute";
import IngredientDetails from "./../ingredient-details/IngredientDetails";
import Modal from "./../modal/Modal";
import OrderDetails from "./../order-details/OrderDetails";
import { wssAddress } from "./../../utils/constants";
import SocketConnectRouter from "./../socket-connect-router/SocketConnectRouter";

// по совету наставника временно задана декларация чтобы обойти ошибку TS2322 возникающая на ui элементе Tab
declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.feedWS);
  const { loggedIn } = useAppSelector((state) => state.user);
  const location = useLocation();
  const locationState = useMemo(() => location.state as { backgroundLocation: Location }, [location.state]);
  const navigate = useNavigate();

  let accessToken = useMemo<string>(() => sessionStorage.getItem("token") || "", [loggedIn]);

  useEffect(() => {
    // для сброса стейта у текущего местоположения при инициализации апп
    // чтобы при перезагрузке страницы скинуть backgroundLocation для модального окна и перейти на прямой путь
    location.state = null;
  }, []);

  const handleCloseModal = useCallback(() => {
    navigate(locationState?.backgroundLocation?.pathname || "/");
  }, [locationState, navigate]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (token) {
      dispatch(onGetUser(token)).then(({ payload }) => {
        if (!refreshToken) {
          return;
        }
        if (!payload) {
          dispatch(onRefreshToken(refreshToken));
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={appStyle.page}>
      <AppHeader />
      <Routes location={locationState?.backgroundLocation || location}>
        <Route path="/" element={<Main />} />

        <Route path="" element={<SocketConnectRouter socketUrl={`${wssAddress}/all`} />}>
          <Route path="feed/" element={<Feed />}>
            <Route path=":id" element={data.success && <OrderDetails orderFeedData={data} />} />
          </Route>
        </Route>

        <Route path="" element={<SocketConnectRouter socketUrl={`${wssAddress}?token=${accessToken}`} />}>
          <Route path="profile/orders/:id" element={data.success && <OrderDetails orderFeedData={data} />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />}>
            <Route path="" element={<ProfileForm />} />
            <Route path="" element={<SocketConnectRouter socketUrl={`${wssAddress}?token=${accessToken}`} />}>
              <Route path="orders" element={<Orders />}>
                <Route path=":id" element={data.success && <OrderDetails orderFeedData={data} />} />
              </Route>
            </Route>
          </Route>
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
            path="ingredient/:id"
            element={
              <Modal onCloseModal={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="feed/:id"
            element={
              data.success && (
                <Modal onCloseModal={handleCloseModal}>
                  <OrderDetails orderFeedData={data} />
                </Modal>
              )
            }
          />
          <Route path="/" element={<ProtectedRoute />}>
            <Route
              path="profile/orders/:id"
              element={
                data.success && (
                  <Modal onCloseModal={handleCloseModal}>
                    <OrderDetails orderFeedData={data} />
                  </Modal>
                )
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
