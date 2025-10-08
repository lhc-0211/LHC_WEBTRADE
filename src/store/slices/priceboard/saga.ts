import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchChartIndexAPI,
  fetchInfoIndexAPI,
} from "../../../api/priceBoardApi";
import type { ChartIndex, InfoIndex } from "../../../types";
import {
  fetchChartIndexFailure,
  fetchChartIndexRequest,
  fetchChartIndexSuccess,
  fetchInfoIndexFailure,
  fetchInfoIndexRequest,
  fetchInfoIndexSuccess,
} from "./reducer";

// Định nghĩa type cho action saga
interface FetchChartIndexAction {
  type: string;
  payload: string; // id
}

function* fetchInfoIndexSaga() {
  try {
    const response: { data: InfoIndex[] } = yield call(fetchInfoIndexAPI);
    yield put(fetchInfoIndexSuccess(response.data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(fetchInfoIndexFailure(error.message));
    } else {
      yield put(fetchInfoIndexFailure("Unknown error"));
    }
  }
}

function* fetchChartIndexSaga(action: FetchChartIndexAction) {
  try {
    const response: { data: ChartIndex[] } = yield call(
      fetchChartIndexAPI,
      action.payload
    );
    yield put(fetchChartIndexSuccess({ id: action.payload, ...response }));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(fetchChartIndexFailure(error.message));
    } else {
      yield put(fetchChartIndexFailure("Unknown error"));
    }
  }
}

export default function* priceBoardSaga() {
  yield takeLatest(fetchInfoIndexRequest.type, fetchInfoIndexSaga);
  yield takeLatest(fetchChartIndexRequest.type, fetchChartIndexSaga);
}
