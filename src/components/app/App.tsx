import { FC, useCallback, useEffect } from "react";
import AppHeader from "../app-header/AppHeader";
import appStyle from "./app.module.css";
import { fetchIngredients } from "../../services/actions/ingredients";
import { useAppDispatch, useAppSelector } from "../../services/store";
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
import { wssAddressOrdersAll } from "../../utils/constants";
import feedsSlice from "../../services/reducers/feed";
import FeedDetails from "../feed-details/FeedDetails";

// по совету наставника временно задана декларация чтобы обойти ошибку TS2322 возникающая на ui элементе Tab
declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { allOrderFeedData } = useAppSelector((state) => state.feed);
  const { setOrderFeedData } = feedsSlice.actions;
  const location = useLocation();
  const locationState = location.state as { backgroundLocation?: Location };
  const navigate = useNavigate();

  const processEvent = useCallback((event: MessageEvent) => {
    const normalizeData = JSON.parse(event.data);
    if (normalizeData.success === true) {
      console.log(normalizeData);
      dispatch(setOrderFeedData({ data: normalizeData }));
    }
  }, []);

  const { connect } = useSocket(wssAddressOrdersAll, {
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
    connect("");
  }, []);

  return (
    <div className={appStyle.page}>
      <AppHeader />
      <Routes location={locationState?.backgroundLocation || location}>
        <Route path="/" element={<Main />} />

        <Route path="feed/" element={<Feed />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="feed/:id" element={<FeedDetails orderFeedData={allOrderFeedData} />} />
          <Route path="profile" element={<Profile />}>
            <Route path="" element={<ProfileForm />} />
            <Route path="orders" element={<Orders />} />
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
                <FeedDetails orderFeedData={allOrderFeedData} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
