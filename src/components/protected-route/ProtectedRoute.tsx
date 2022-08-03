import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from './../../services/store';

const ProtectedRoute: FC = () => {
  const { loggedIn } = useAppSelector((state) => state.user);
  return loggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
