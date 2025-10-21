import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastPayload {
  title?: string;
  msg: string;
  type?: ToastType;
}

interface AppState {
  toast?: ToastPayload | null;
}

const initialState: AppState = {
  toast: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastPayload>) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = null;
    },
  },
});

export const { showToast, clearToast } = appSlice.actions;
export default appSlice.reducer;
