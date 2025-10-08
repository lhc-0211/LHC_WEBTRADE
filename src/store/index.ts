import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import clientReducer from "./slices/clientSlice";
import priceboardReducer from "./slices/priceboardSlice";

export const store = configureStore({
  reducer: {
    priceboard: priceboardReducer,
    client: clientReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
