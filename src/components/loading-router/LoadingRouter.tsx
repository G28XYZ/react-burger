import { FC, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import Preloader from "../preloader";

const LoadingRouter: FC = () => {
  const { loading } = useAppSelector((state) => state.ingredients);
  const { loggedIn } = useAppSelector((state) => state.user);
  const { allOrderFeedData, ownerOrderFeedData } = useAppSelector((state) => state.feed);
  const accessToken = useMemo(() => sessionStorage.getItem("token"), [sessionStorage.getItem("token"), loggedIn]);
  if (accessToken) {
    return <>{allOrderFeedData.success && ownerOrderFeedData.success ? <Outlet /> : <Preloader />}</>;
  }
  return <>{loading && allOrderFeedData.success ? <Outlet /> : <Preloader />}</>;
};

export default LoadingRouter;
