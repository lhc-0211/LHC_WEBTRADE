import { createSlice } from "@reduxjs/toolkit";

export interface ClientState {
  data: {
    loginModalOpen: boolean;
  };
}

const initialState: ClientState = {
  data: {
    loginModalOpen: false,
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
  },
});

export const { openLoginModal, closeLoginModal } = clientSlice.actions;
export default clientSlice.reducer;
