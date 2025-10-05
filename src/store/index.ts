import { configureStore } from "@reduxjs/toolkit";
import priceboardReducer from "./slices/priceBoardSlice";

export const store = configureStore({
  reducer: {
    priceboard: priceboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
