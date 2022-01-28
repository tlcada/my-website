import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { production } from "../environment/profile";
import rootReducer from "./reducers";
import { pokemonApi } from "../app/components/Login/services/pokemon";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: rootReducer,
  devTools: !production,
  // See default middlewares: https://redux-toolkit.js.org/api/getDefaultMiddleware
  middleware: (getDefaultMiddleware) => {
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    const defaultMiddleware = getDefaultMiddleware().concat(pokemonApi.middleware);
    if (!production) {
      return defaultMiddleware.concat(logger);
    } else {
      return defaultMiddleware;
    }
  },
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
