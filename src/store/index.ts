import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import authSaga from "./slices/auth/saga";
import authSlice from "./slices/auth/slice";
import clientSaga from "./slices/client/saga";
import clientSlice from "./slices/client/slice";
import priceBoardSaga from "./slices/priceboard/saga";
import priceBoardSlice from "./slices/priceboard/slice";

import globalSlice from "./slices/global/slice";

function* rootSaga() {
  yield all([priceBoardSaga(), authSaga(), clientSaga()]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    priceBoard: priceBoardSlice,
    auth: authSlice,
    client: clientSlice,
    global: globalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
