import { createAction } from '@reduxjs/toolkit';
import { IFetchOrdersData } from './../../utils/types';

export type Data = {
  type: 'DATA';
  data: IFetchOrdersData;
};

export type TWSAction = Data;

export type TWSActions = Array<TWSAction>;

export const connect = createAction<string, 'WS_CONNECT'>('WS_CONNECT');
export const disconnect = createAction('WS_DISCONNECT');
export const wsConnecting = createAction('WS_CONNECTING');
export const wsOpen = createAction('WS_OPEN');
export const wsClose = createAction('WS_CLOSE');
export const wsMessage = createAction<TWSActions, 'WS_MESSAGE'>('WS_MESSAGE');
export const wsError = createAction<string, 'WS_ERROR'>('WS_ERROR');
export const countConnect = createAction<number>('COUNT_CONNECT');

export const wsActions = {
  wsConnect: connect,
  wsDisconnect: disconnect,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onMessage: wsMessage,
  onError: wsError,
  count: countConnect,
};
