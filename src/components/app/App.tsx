import { FC, useCallback, useEffect, useMemo } from "react";
import AppHeader from "../app-header/AppHeader";
import appStyle from "./app.module.css";
import { fetchIngredients } from "../../services/actions/ingredients";
import { useAppDispatch } from "../../services/store";
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
} from "../../pages";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import { onGetUser, onRefreshToken } from "../../services/actions/user";
import PrivateRoute from "../private-route/PrivateRoute";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import Modal from "../modal/Modal";
import { useSocket } from "../../hooks/useSocket";
import { wssAddress } from "../../utils/constants";
import feedsSlice from "../../services/reducers/feed";
import FeedDetails from "../feed-details/FeedDetails";
import LoadingRouter from "../loading-router/LoadingRouter";

// по совету наставника временно задана декларация чтобы обойти ошибку TS2322 возникающая на ui элементе Tab
declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { setAllOrderFeedData, setOwnerOrderFeedData } = feedsSlice.actions;
  const location = useLocation();
  const locationState = location.state as { backgroundLocation?: Location };
  const navigate = useNavigate();

  const accessToken = useMemo<string>(() => sessionStorage.getItem("token") || "", []);

  const processEvent = useCallback((event: MessageEvent) => {
    const normalizeData = JSON.parse(event.data);
    const target = event.target as WebSocket;
    if (normalizeData.success === true) {
      if (target.url.includes(accessToken)) {
        dispatch(setOwnerOrderFeedData({ data: normalizeData }));
        return;
      }
      dispatch(setAllOrderFeedData({ data: normalizeData }));
    }
  }, []);

  const socketAllOrders = useSocket(`${wssAddress}/all`, {
    onMessage: processEvent,
  });

  const socketOwnerOrders = useSocket(wssAddress, {
    onMessage: processEvent,
  });

  const handleCloseModal = useCallback(() => {
    navigate(locationState.backgroundLocation?.pathname || "/");
  }, [locationState, navigate]);

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

  useEffect(() => {
    socketAllOrders.connect("");
  }, []);

  useEffect(() => {
    if (accessToken) socketOwnerOrders.connect(accessToken);
  }, [accessToken]);

  return (
    <div className={appStyle.page}>
      <AppHeader />
      <Routes location={locationState?.backgroundLocation || location}>
        <Route path="/" element={<LoadingRouter />}>
          <Route path="/" element={<Main socketOwnerOrders={socketOwnerOrders} />} />

          <Route path="feed/" element={<Feed />} />

          <Route path="/" element={<ProtectedRoute />}>
            <Route path="feed/:id" element={<FeedDetails orderFeedDataName={"allOrderFeedData"} />} />
            <Route path="profile" element={<Profile />}>
              <Route path="" element={<ProfileForm />} />
              <Route path="orders" element={<Orders />}>
                <Route path=":id" element={<FeedDetails orderFeedDataName={"ownerOrderFeedData"} />} />
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
        </Route>
      </Routes>

      {locationState?.backgroundLocation && (
        <Routes>
          <Route path="/" element={<LoadingRouter />}>
            <Route
              path="/ingredient/:id"
              element={
                <Modal onCloseModal={handleCloseModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path="/feed/:id"
              element={
                <Modal onCloseModal={handleCloseModal}>
                  <FeedDetails orderFeedDataName={"allOrderFeedData"} />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:id"
              element={
                <Modal onCloseModal={handleCloseModal}>
                  <FeedDetails orderFeedDataName={"ownerOrderFeedData"} />
                </Modal>
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
