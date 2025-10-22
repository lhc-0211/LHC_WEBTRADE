import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  changeNicknameApi,
  checkNicknameApi,
  fetchAccountProfileAPI,
  fetchChangeAccInfoApi,
} from "../../../api/clientApi";
import type {
  AccountProfileResponse,
  ChangeAccountInfoActionPayload,
  ChangeAccountInfoResponse,
  ChangeNicknamePayload,
  ChangeNicknameResponse,
} from "../../../types/client";
import { getMsgByErrorCode } from "../../../utils";
import { showToast } from "../global/slice";
import {
  fetchAccountProfileFailure,
  fetchAccountProfileRequest,
  fetchAccountProfileSuccess,
  fetchChangeAccountInfoFailure,
  fetchChangeAccountInfoRequest,
  fetchChangeAccountInfoSuccess,
  fetchChangeNicknameFailure,
  fetchChangeNicknameRequest,
  fetchChangeNicknameSuccess,
  fetchCheckNicknameFailure,
  fetchCheckNicknameRequest,
  fetchCheckNicknameSuccess,
} from "./slice";

function* fetchAccountProfileSaga() {
  try {
    const res: AccountProfileResponse = yield call(fetchAccountProfileAPI);

    if (res.rc < 1) {
      yield put(
        showToast({
          msg: getMsgByErrorCode(res.rc + "") || res.msg || "Thất bại",
          type: "error",
        })
      );
      put(fetchAccountProfileFailure(res.msg || "Thất bại"));
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchAccountProfileSuccess(res.data));
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

    if (res.rc < 1) {
      yield put(
        showToast({
          msg: getMsgByErrorCode(res.rc + "") || res.msg || "Thất bại",
          type: "error",
        })
      );
      put(fetchCheckNicknameFailure(res.msg || "Thất bại"));
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchCheckNicknameSuccess(res.data));
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

    if (res.rc < 1) {
      yield put(
        showToast({
          msg: getMsgByErrorCode(res.rc + "") || res.msg || "Thất bại",
          type: "error",
        })
      );
      yield put(fetchChangeNicknameFailure(res.msg || "Thất bại"));
      throw Error(res.msg || "Thất bại");
    }

    yield put(fetchChangeNicknameSuccess());
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch info index";
    yield put(fetchChangeNicknameFailure(errorMessage));
  }
}

function* fetchChangeAccountInfoSaga(
  action: PayloadAction<ChangeAccountInfoActionPayload>
) {
  try {
    const { otp, ...payload } = action.payload;

    const res: ChangeAccountInfoResponse = yield call(
      fetchChangeAccInfoApi,
      payload,
      otp
    );

    if (res.rc < 1) {
      yield put(
        showToast({
          msg: getMsgByErrorCode(res.rc + "") || res.msg || "Thất bại",
          type: "error",
        })
      );
      yield put(fetchChangeAccountInfoFailure(res.msg || "Thất bại"));
      throw Error(res.msg || "Thất bại");
    }
    yield put(fetchChangeAccountInfoSuccess());
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch info index";
    yield put(fetchChangeAccountInfoFailure(errorMessage));
  }
}

export default function* clientSaga() {
  yield takeLatest(fetchAccountProfileRequest, fetchAccountProfileSaga);
  yield takeLatest(fetchCheckNicknameRequest, fetchCheckNicknameSaga);
  yield takeLatest(fetchChangeNicknameRequest, fetchChangeNicknameSaga);
  yield takeLatest(fetchChangeAccountInfoRequest, fetchChangeAccountInfoSaga);
}
