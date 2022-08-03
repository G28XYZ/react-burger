import { createReducer } from '@reduxjs/toolkit';
import { IFetchOrdersData } from './../../utils/types';
import { wsOpen, wsClose, wsMessage, wsError, wsConnecting, countConnect } from './../actions/feedWebSocket';

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  ERROR = 'ERROR',
}

export interface TwsState {
  status: WebsocketStatus;
  connectionError: string;
  data: IFetchOrdersData;
  count: number;
}

const initialState = {
  count: 0,
  status: WebsocketStatus.OFFLINE,
  connectionError: '',
  data: { orders: [], success: false, total: 0, totalToday: 0 },
};

export const wssReducer = createReducer<TwsState>(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = '';
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.status = WebsocketStatus.ERROR;
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.data = { ...state.data, ...action.payload };
    })
    .addCase(countConnect, (state, action) => {
      state.count = action.payload;
    });
});
