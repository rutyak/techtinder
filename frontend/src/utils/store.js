import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import requestsReducer from "./requestsSlice";
import connectionsReducer from "./connectionsSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  feeds: feedReducer,
  connections: connectionsReducer,
  requests: requestsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
