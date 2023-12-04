import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from 'react-redux';

import rootReducer, { RootState } from './reducer';
import middlewares from './middlewares';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(middlewares),
});

const { dispatch } = store;

const useDispatch = () => useAppDispatch<typeof store.dispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, dispatch, useSelector, useDispatch };
