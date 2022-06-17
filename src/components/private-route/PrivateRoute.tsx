import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../services/store";

function PrivateRoute() {
  const { loggedIn } = useAppSelector((state) => state.user);
  return loggedIn ? <Navigate to={"/"} /> : <Outlet />;
}

export default PrivateRoute;
