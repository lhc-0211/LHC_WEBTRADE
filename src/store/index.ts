import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import authSaga from "./slices/auth/saga";
import authReducer from "./slices/auth/slice";
import priceBoardSaga from "./slices/priceboard/saga";
import priceBoardReducer from "./slices/priceboard/slice";

function* rootSaga() {
  yield all([priceBoardSaga(), authSaga()]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    priceBoard: priceBoardReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
