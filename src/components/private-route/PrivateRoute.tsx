import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from './../../services/store';

const PrivateRoute: FC = () => {
  const { loggedIn } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  return loggedIn ? <>{navigate(-1)}</> : <Outlet />;
};

export default PrivateRoute;
