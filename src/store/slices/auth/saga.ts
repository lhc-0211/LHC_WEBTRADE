import {
  call,
  put,
  takeLatest,
  type CallEffect,
  type ForkEffect,
  type PutEffect,
} from "redux-saga/effects";
import { loginApi } from "../../../api/authApi";
import type { LoginPayload, LoginResponse } from "../../../types";
import { loginFailure, loginRequest, loginSuccess, logout } from "./slice";

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

function* logoutSaga(): Generator<GeneratorYield> {
  yield put(logout());
}

export default function* authSaga(): Generator<GeneratorYield> {
  yield takeLatest(loginRequest, loginSaga);
  yield takeLatest(logout, logoutSaga);
}
