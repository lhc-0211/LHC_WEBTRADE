import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiStatus } from "../../../types";

export interface AuthState {
  data: {
    token: object | null | string;
  };
  status: {
    fetchToken: ApiStatus;
  };
}

const initialState: AuthState = {
  data: { token: {} },
  status: { fetchToken: { loading: false, error: null } },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.status.fetchToken = { loading: true, error: null };
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.data.token = action.payload;
      state.status.fetchToken = { loading: false, error: null };
      localStorage.setItem("token", action.payload);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.data.token = null;
      state.status.fetchToken = { loading: false, error: action.payload };
    },
    logout: (state) => {
      state.data.token = null;
      state.status.fetchToken = { loading: false, error: null };
      localStorage.removeItem("token");
    },
    restoreToken: (state) => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        state.data.token = savedToken;
        state.status.fetchToken = { loading: false, error: null };
      }
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  restoreToken,
} = authSlice.actions;
export default authSlice.reducer;
