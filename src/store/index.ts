import {
  PreloadedStateShapeFromReducersMapObject,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import loggerMiddleware from 'redux-logger';
import { productsReducer } from './reducers/products/slice';

export const rootReducer = combineReducers({
  products: productsReducer,
});

export const rootMiddleware = (getDefaultMiddleware: any) =>
  process.env.NODE_ENV === 'development'
    ? getDefaultMiddleware().concat(loggerMiddleware)
    : getDefaultMiddleware();

export type RootState = ReturnType<typeof rootReducer>;

export const storeInit = (preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: rootMiddleware,
    preloadedState,
  });

export const reduxStore = storeInit();

export type AppStore = ReturnType<typeof storeInit>;
export type AppDispatch = AppStore['dispatch'];
