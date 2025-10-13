import type { RootState } from "../..";

export const selectLoginModalOpen = (state: RootState): boolean =>
  state.client.data.loginModalOpen;
