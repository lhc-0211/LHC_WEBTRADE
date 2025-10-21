import type { PayloadAction } from "@reduxjs/toolkit";
import {
  call,
  put,
  takeLatest,
  type CallEffect,
  type ForkEffect,
  type PutEffect,
} from "redux-saga/effects";
import { fetchOtpApi, loginApi } from "../../../api/authApi";
import type {
  FetchOtpPayload,
  FetchOtpResponse,
  LoginPayload,
  LoginResponse,
} from "../../../types";
import {
  fetchotpFailure,
  fetchOtpRequest,
  fetchOtpSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
} from "./slice";

type GeneratorYield = CallEffect | PutEffect | ForkEffect;

function* loginSaga(action: {
  payload: LoginPayload;
}): Generator<GeneratorYield, void, LoginResponse["data"]> {
  try {
    const { accountCode, password, device } = action.payload;
    const tokenData: LoginResponse["data"] = yield call(loginApi, {
      accountCode,
      password,
      device,
    });
    yield put(loginSuccess(tokenData));
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Đăng nhập thất bại";
    yield put(loginFailure(message));
  }
}

function* fetchOtpSaga(action: PayloadAction<FetchOtpPayload>) {
  try {
    const res: FetchOtpResponse = yield call(fetchOtpApi, action.payload);
    if (res.rc === 1) {
      yield put(fetchOtpSuccess(res.data));
    } else {
      yield put(fetchotpFailure(res.msg || "Thất bại"));
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch info index";
    yield put(fetchotpFailure(errorMessage));
  }
}

export default function* authSaga(): Generator<GeneratorYield> {
  yield takeLatest(loginRequest, loginSaga);
  yield takeLatest(fetchOtpRequest, fetchOtpSaga);
}
