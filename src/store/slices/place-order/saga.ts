import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchShareCodeApi, fetchShareStockApi } from "../../../api/placeOrder";
import { showToast } from "../../../hooks/useToast";
import type {
  FetchShareCodeResponse,
  FetchShareStockResponse,
} from "../../../types/placeOrder";
import {
  fetchListShareStockFailure,
  fetchListShareStockRequest,
  fetchListShareStockSuccess,
  fetchShareStockCodeFailure,
  fetchShareStockCodeRequest,
  fetchShareStockCodeSuccess,
} from "./slice";

function* fetchShareStockCodeSaga(
  action: PayloadAction<{ shareCode: string; volume: number }>
) {
  try {
    const res: FetchShareCodeResponse = yield call(
      fetchShareCodeApi,
      action.payload.shareCode,
      action.payload.volume
    );

    if (res.rc < 1) {
      showToast(res.msg || "Thất bại", "error");

      put(fetchShareStockCodeFailure(res.msg || "Thất bại"));
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchShareStockCodeSuccess(res.data));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch info index";
    yield put(fetchShareStockCodeFailure(errorMessage));
  }
}

function* fetchListShareStockSaga() {
  try {
    const res: FetchShareStockResponse = yield call(fetchShareStockApi);

    if (res.rc < 1) {
      showToast(res.msg || "Thất bại", "error");
      put(fetchListShareStockFailure(res.msg || "Thất bại"));
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchListShareStockSuccess(res.data));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch info index";
    yield put(fetchListShareStockFailure(errorMessage));
  }
}

export default function* placeOrderSaga() {
  yield takeLatest(fetchShareStockCodeRequest, fetchShareStockCodeSaga);
  yield takeLatest(fetchListShareStockRequest, fetchListShareStockSaga);
}
