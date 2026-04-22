import {
  combineReducers,
  configureStore,
  ReducersMapObject,
} from '@reduxjs/toolkit';

import { gameApi } from '@/entities/games';

import { userApi } from '@/entities/user';

import { resultsApi } from '@/entities/results';

import type { StateSchema } from '../types/stateSchema';
import { userReducer } from '@/entities/user';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer.reducer,
  };

  const apiReducers = {
    [gameApi.reducerPath]: gameApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [resultsApi.reducerPath]: resultsApi.reducer,
  };

  const combinedReducers = combineReducers({
    ...rootReducers,
    ...apiReducers,
  });

  const store = configureStore({
    reducer: combinedReducers,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['listener/setSub'],
          ignoredPaths: ['listener'],
        },
      }).concat(gameApi.middleware, userApi.middleware, resultsApi.middleware),
  });

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export type RootState = ReturnType<
  ReturnType<typeof createReduxStore>['getState']
>;
