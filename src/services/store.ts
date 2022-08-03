import { compose, applyMiddleware, combineReducers } from 'redux';
import { orderSlice } from './reducers/order';
import modalSlice from './reducers/modal';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ingredientsSlice } from './reducers/ingredients';
import thunk from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import userSlice from './reducers/user';
import { socketMiddleware } from './middleware/socketMiddleware';
import { wsActions } from './actions/feedWebSocket';
import { wssReducer } from './reducers/feedWebSocket';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  order: orderSlice.reducer,
  modal: modalSlice.reducer,
  user: userSlice.reducer,
  feedWS: wssReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  enhancers: (defaultEnhancers) => [applyMiddleware(thunk), ...defaultEnhancers],
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(socketMiddleware(wsActions));
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
