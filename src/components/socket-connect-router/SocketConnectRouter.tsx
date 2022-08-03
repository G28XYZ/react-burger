import { FC, useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { NotFound } from './../../pages';
import { connect, countConnect, disconnect } from './../../services/actions/feedWebSocket';
import { useAppDispatch, useAppSelector } from './../../services/store';
import Preloader from './../preloader';

const SocketConnectRouter: FC<{ socketUrl: string }> = ({ socketUrl }) => {
  const dispatch = useAppDispatch();
  const { data, status, connectionError, count } = useAppSelector((state) => state.feedWS);
  const wsConnect = () => dispatch(connect(socketUrl));
  const wsDisconnect = () => dispatch(disconnect());

  const isConnectingError = useMemo(() => count > 3 && data.success === false, [count, data.success]);

  useEffect(() => {
    if (connectionError) {
      dispatch(countConnect(count + 1));
    }
  }, [connectionError]);

  useEffect(() => {
    wsConnect();
    return () => {
      dispatch(countConnect(0));
      wsDisconnect();
    };
  }, [socketUrl]);

  useEffect(() => {
    if (isConnectingError) {
      wsDisconnect();
      console.log('Ошибка при запросе');
    }
  }, [isConnectingError]);

  return (
    <>
      {data.success ? (
        <Outlet />
      ) : isConnectingError ? (
        <NotFound code={connectionError} message={`Fetching error: ${status}`} />
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default SocketConnectRouter;
