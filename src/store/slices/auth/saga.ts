// authSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import { loginApi } from "../../../api/authApi"; // Giả sử loginApi nằm trong file này
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
  restoreToken,
} from "./slice";

// Định nghĩa type cho action login
interface LoginAction {
  type: string;
  payload: { accountCode: string; password: string; device: string };
}

// Saga xử lý đăng nhập
function* loginSaga(action: LoginAction) {
  try {
    const { accountCode, password, device } = action.payload;
    const token: string = yield call(loginApi, {
      accountCode,
      password,
      device,
    });
    yield put(loginSuccess(token));
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Login failed";
    yield put(loginFailure(errorMessage));
  }
}

// Saga xử lý đăng xuất
function* logoutSaga() {
  try {
    yield put(logout());
  } catch (error: unknown) {
    console.error("Logout failed:", error);
  }
}

// Saga xử lý restore token
function* restoreTokenSaga() {
  try {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      // Tùy chọn: Gọi API để validate token nếu cần
      // const response = yield call(validateTokenApi, savedToken);
      // if (response.valid) {
      yield put(restoreToken());
      // } else {
      //   yield put(loginFailure("Invalid token"));
      // }
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to restore token";
    yield put(loginFailure(errorMessage));
  }
}

// Saga chính
export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(logout.type, logoutSaga);
  yield takeLatest(restoreToken.type, restoreTokenSaga);
}
