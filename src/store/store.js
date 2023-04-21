import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import employeesReducer from "./reducers/employeesReducer";
import { configureStore } from "@reduxjs/toolkit";
const persistConfig = {
  key: "userStore",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, employeesReducer);

export const store = configureStore({
  reducer: {
    employees: persistedReducer,
  },
});

export const persistor = persistStore(store);
