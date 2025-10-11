import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
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
} from "./slice";

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
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch info index";
    yield put(fetchInfoIndexFailure(errorMessage));
  }
}

function* fetchChartIndexSaga(action: FetchChartIndexAction) {
  try {
    const response: { data: ChartIndex[] } = yield call(
      fetchChartIndexAPI,
      action.payload
    );

    yield put(
      fetchChartIndexSuccess({ id: action.payload, data: response.data })
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch info index";
    console.error(`Error fetching ${action.payload}:`, errorMessage); // Log lỗi
    yield put(fetchChartIndexFailure(action.payload)); // Truyền id thay vì errorMessage
  }
}

export default function* priceBoardSaga() {
  yield takeLatest(fetchInfoIndexRequest.type, fetchInfoIndexSaga);
  yield takeEvery(fetchChartIndexRequest.type, fetchChartIndexSaga);
}
