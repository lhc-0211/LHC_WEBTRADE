import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  changeNicknameApi,
  checkNicknameApi,
  fetchAccountProfileAPI,
} from "../../../api/clientApi";
import type {
  AccountProfile,
  ChangeNicknamePayload,
  ChangeNicknameResponse,
} from "../../../types/client";
import {
  fetchAccountProfileFailure,
  fetchAccountProfileRequest,
  fetchAccountProfileSuccess,
  fetchChangeNicknameFailure,
  fetchChangeNicknameRequest,
  fetchChangeNicknameSuccess,
  fetchCheckNicknameFailure,
  fetchCheckNicknameRequest,
  fetchCheckNicknameSuccess,
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

function* fetchCheckNicknameSaga(
  action: PayloadAction<Pick<ChangeNicknamePayload, "NICK_NAME">>
) {
  try {
    const res: ChangeNicknameResponse = yield call(
      checkNicknameApi,
      action.payload
    );
    if (res.rc === 1) {
      yield put(fetchCheckNicknameSuccess(res.data));
    } else {
      yield put(fetchCheckNicknameFailure(res.msg || "Thất bại"));
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch info index";
    yield put(fetchCheckNicknameFailure(errorMessage));
  }
}

function* fetchChangeNicknameSaga(
  action: PayloadAction<ChangeNicknamePayload>
) {
  try {
    const res: ChangeNicknameResponse = yield call(
      changeNicknameApi,
      action.payload
    );
    if (res.rc === 1) {
      yield put(fetchChangeNicknameSuccess());
    } else {
      yield put(fetchChangeNicknameFailure(res.msg || "Thất bại"));
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch info index";
    yield put(fetchChangeNicknameFailure(errorMessage));
  }
}

export default function* clientSaga() {
  yield takeLatest(fetchAccountProfileRequest, fetchAccountProfileSaga);
  yield takeLatest(fetchCheckNicknameRequest, fetchCheckNicknameSaga);
  yield takeLatest(fetchChangeNicknameRequest, fetchChangeNicknameSaga);
}
