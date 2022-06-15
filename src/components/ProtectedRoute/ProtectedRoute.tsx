import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../services/store";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const state = useAppSelector((state) => state.user);
  return <>{state.loggedIn ? children : <Navigate to={"/sign-in"} />}</>;
}

export default ProtectedRoute;
