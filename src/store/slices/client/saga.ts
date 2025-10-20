import { call, put, takeLatest } from "redux-saga/effects";
import { fetchAccountProfileAPI } from "../../../api/clientApi";
import type { AccountProfile } from "../../../types/client";
import {
  fetchAccountProfileFailure,
  fetchAccountProfileRequest,
  fetchAccountProfileSuccess,
} from "./slice";

function* fetchAccountProfileSaga() {
  try {
    const response: AccountProfile = yield call(fetchAccountProfileAPI);

    yield put(fetchAccountProfileSuccess(response));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch info index";
    yield put(fetchAccountProfileFailure(errorMessage));
  }
}

export default function* clientSaga() {
  yield takeLatest(fetchAccountProfileRequest, fetchAccountProfileSaga);
}
