import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiStatus } from "../../../types";
import type {
  AccountProfile,
  ChangeAccountInfoActionPayload,
  ChangeNicknamePayload,
  CheckNicknameDataResponse,
} from "../../../types/client";

export interface ClientState {
  data: {
    loginModalOpen: boolean;
    accountProfile: AccountProfile | null;
    sessionExpired: boolean;
    checkNickname: CheckNicknameDataResponse | null;
  };
  status: {
    fetchAccountProfile: ApiStatus;
    fetchChangeNickname: ApiStatus;
    fetchCheckNickname: ApiStatus;
    fetchChangeAccountInfo: ApiStatus;
  };
}

const initialState: ClientState = {
  data: {
    loginModalOpen: false,
    accountProfile: null,
    sessionExpired: false,
    checkNickname: null,
  },
  status: {
    fetchAccountProfile: { loading: false, error: null },
    fetchChangeNickname: { loading: false, error: null, success: false },
    fetchCheckNickname: { loading: false, error: null },
    fetchChangeAccountInfo: { loading: false, error: null, success: false },
  },
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.data.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.data.loginModalOpen = false;
    },

    //Hiện modal phiên đăng nhập
    setSessionExpired: (state, action: PayloadAction<boolean>) => {
      state.data.sessionExpired = action.payload;
    },

    // Thông tin tài khoản
    fetchAccountProfileRequest(state) {
      state.status.fetchAccountProfile = { loading: true, error: null };
      state.data.accountProfile = null;
    },
    fetchAccountProfileSuccess(state, action: PayloadAction<AccountProfile>) {
      state.status.fetchAccountProfile = { loading: false, error: null };
      state.data.accountProfile = action.payload;
    },
    fetchAccountProfileFailure(state, action: PayloadAction<string>) {
      state.status.fetchAccountProfile = {
        loading: false,
        error: action.payload,
      };
      state.data.accountProfile = null;
    },

    //Check nickname
    fetchCheckNicknameRequest(
      state,
      action: PayloadAction<Pick<ChangeNicknamePayload, "NICK_NAME">>
    ) {
      state.status.fetchCheckNickname = { loading: true, error: null };
      state.data.checkNickname = null;
    },
    fetchCheckNicknameSuccess(
      state,
      action: PayloadAction<CheckNicknameDataResponse | null>
    ) {
      state.status.fetchCheckNickname = { loading: false, error: null };
      state.data.checkNickname = action.payload;
    },
    fetchCheckNicknameFailure(state, action: PayloadAction<string>) {
      state.status.fetchCheckNickname = {
        loading: false,
        error: action.payload,
      };
      state.data.checkNickname = null;
    },

    //Đổi nickname
    fetchChangeNicknameRequest: (
      state,
      action: PayloadAction<ChangeNicknamePayload>
    ) => {
      state.status.fetchChangeNickname.loading = true;
      state.status.fetchChangeNickname.error = null;
      state.status.fetchChangeNickname.success = false;
    },
    fetchChangeNicknameSuccess: (state) => {
      state.status.fetchChangeNickname.loading = false;
      state.status.fetchChangeNickname.success = true;
    },
    fetchChangeNicknameFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchChangeNickname.loading = false;
      state.status.fetchChangeNickname.error = action.payload;
      state.status.fetchChangeNickname.success = false;
    },
    resetFetchChangeNickname: (state) => {
      state.status.fetchChangeNickname = {
        loading: false,
        success: false,
        error: null,
      };
    },

    //Đổi thông tin tài khoản
    fetchChangeAccountInfoRequest: (
      state,
      action: PayloadAction<ChangeAccountInfoActionPayload>
    ) => {
      state.status.fetchChangeAccountInfo.loading = true;
      state.status.fetchChangeAccountInfo.error = null;
      state.status.fetchChangeAccountInfo.success = false;
    },
    fetchChangeAccountInfoSuccess: (state) => {
      state.status.fetchChangeAccountInfo.loading = false;
      state.status.fetchChangeAccountInfo.success = true;
    },
    fetchChangeAccountInfoFailure: (state, action: PayloadAction<string>) => {
      state.status.fetchChangeAccountInfo.loading = false;
      state.status.fetchChangeAccountInfo.error = action.payload;
      state.status.fetchChangeAccountInfo.success = false;
    },
    resetFetchChangeAccountInfo: (state) => {
      state.status.fetchChangeAccountInfo = {
        loading: false,
        success: false,
        error: null,
      };
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  setSessionExpired,
  fetchAccountProfileRequest,
  fetchAccountProfileSuccess,
  fetchAccountProfileFailure,
  fetchCheckNicknameRequest,
  fetchCheckNicknameSuccess,
  fetchCheckNicknameFailure,
  fetchChangeNicknameRequest,
  fetchChangeNicknameSuccess,
  fetchChangeNicknameFailure,
  resetFetchChangeNickname,
  fetchChangeAccountInfoRequest,
  fetchChangeAccountInfoSuccess,
  fetchChangeAccountInfoFailure,
  resetFetchChangeAccountInfo,
} = clientSlice.actions;
export default clientSlice.reducer;
