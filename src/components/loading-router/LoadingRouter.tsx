import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import Preloader from "../preloader";

const LoadingRouter: FC = () => {
  const { loading } = useAppSelector((state) => state.ingredients);
  const { allOrderFeedData } = useAppSelector((state) => state.feed);
  return <>{loading && allOrderFeedData.success ? <Outlet /> : <Preloader />}</>;
};

export default LoadingRouter;
