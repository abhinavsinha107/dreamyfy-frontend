import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducer/authReducer";
import userReducer from "./reducer/userReducer";
import { api } from "../services/api";

const authPersistConfig = {
  key: "auth",
  storage,
};
const userPersistConfig = {
  key: "user",
  storage,
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);
const userPersistedReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    user: userPersistedReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();