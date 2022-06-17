import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../services/store";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loggedIn } = useAppSelector((state) => state.user);
  return <>{loggedIn ? children : <Navigate to="/login" />}</>;
}

export default ProtectedRoute;
