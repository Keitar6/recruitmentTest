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
  getDefaultMiddleware().concat(loggerMiddleware);

export type RootState = ReturnType<typeof rootReducer>;

const storeInit = (preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: rootMiddleware,
    preloadedState,
  });

export const reduxStore = storeInit();

export type AppStore = ReturnType<typeof storeInit>;
export type AppDispatch = AppStore['dispatch'];