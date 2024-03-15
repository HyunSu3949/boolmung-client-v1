import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { authReducer } from "src/redux/features/authSlice";
import { socketReducer } from "src/redux/features/socketSlice";
import { socketMiddleware } from "src/redux/features/socketMiddleware";
import { actionReducer } from "src/redux/features/actionSlice";
import { modalReducer } from "src/redux/features/modalSlice";

const reducers = combineReducers({
  authReducer,
  socketReducer,
  actionReducer,
  modalReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer", "socketReducer"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: { reducer: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
