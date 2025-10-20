import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiStatus } from "../../../types";
import type { AccountProfile } from "../../../types/client";

export interface ClientState {
  data: {
    loginModalOpen: boolean;
    accountProfile: AccountProfile | null;
  };
  status: {
    fetchAccountProfile: ApiStatus;
  };
}

const initialState: ClientState = {
  data: {
    loginModalOpen: false,
    accountProfile: null,
  },
  status: {
    fetchAccountProfile: { loading: false, error: null },
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
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  fetchAccountProfileRequest,
  fetchAccountProfileSuccess,
  fetchAccountProfileFailure,
} = clientSlice.actions;
export default clientSlice.reducer;
