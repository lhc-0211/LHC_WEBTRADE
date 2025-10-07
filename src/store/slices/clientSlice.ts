import { createSlice } from "@reduxjs/toolkit";

interface ClientState {
  loginModalOpen: boolean;
}

const initialState: ClientState = {
  loginModalOpen: false,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
  },
});

export const { openLoginModal, closeLoginModal } = clientSlice.actions;
export default clientSlice.reducer;
