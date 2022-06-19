import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../services/store";

function ProtectedRoute() {
  const { loggedIn } = useAppSelector((state) => state.user);
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
