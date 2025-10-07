import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./slices/clientSlice";
import priceboardReducer from "./slices/priceBoardSlice";

export const store = configureStore({
  reducer: {
    priceboard: priceboardReducer,
    client: clientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
