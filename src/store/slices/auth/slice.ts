import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ApiStatus,
  LoginPayload,
  LoginResponse,
  Token,
} from "../../../types";

export interface AuthState {
  data: { token: Token };
  status: { fetchToken: ApiStatus };
}

const initialState: AuthState = {
  data: {
    token: (() => {
      try {
        const saved = localStorage.getItem("token");
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    })(),
  },
  status: { fetchToken: { loading: false, error: null } },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginPayload>) => {
      state.status.fetchToken = { loading: true, error: null };
    },
    loginSuccess: (state, action: PayloadAction<LoginResponse["data"]>) => {
      state.data.token = action.payload;
      state.status.fetchToken = { loading: false, error: null };
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.data.token = null;
      state.status.fetchToken = { loading: false, error: action.payload };
    },
    logout: (state) => {
      state.data.token = null;
      state.status.fetchToken = { loading: false, error: null };
      localStorage.removeItem("token");
      localStorage.removeItem("sessionId");
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
